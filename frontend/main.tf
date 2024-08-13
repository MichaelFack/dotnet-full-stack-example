##################
# Push to docker #
##################

resource "aws_ecr_repository" "frontend_ecr_repository" {
  name                 = "frontend_ecr_repo"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = var.tags
}

resource "random_string" "docker_image_tag" {
  length  = 16
  special = false
  keepers = {
    docker_image_content_hash  = sha1(join("|", [for f in fileset("${path.module}/src", "*") : filesha1("${path.module}/src/${f}")], [for f in fileset("${path.module}/public", "*") : filesha1("${path.module}/public/${f}")]))
    docker_image_packages_hash = filesha1("${path.module}/package-lock.json")
  }
}

resource "terraform_data" "push_to_docker" {
  # Changes to tag infers change to image
  triggers_replace = [
    random_string.docker_image_tag
  ]

  provisioner "local-exec" {
    command = "aws ecr get-login-password --region ${var.region} | docker login --username AWS --password-stdin ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com && docker build -t ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${aws_ecr_repository.frontend_ecr_repository.name}:${random_string.docker_image_tag.result} ${path.module} && docker push ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${aws_ecr_repository.frontend_ecr_repository.name}:${random_string.docker_image_tag.result}"
  }
}

#######
# ECS #
#######

resource "aws_launch_template" "ecs_micro_template" {
  name_prefix   = "ecs-micro-linux-template"
  image_id      = "ami-0346fd83e3383dcb4"
  instance_type = "t3.micro"

  vpc_security_group_ids = var.vpc_security_group_ids

  iam_instance_profile {
    name = "ecsInstanceRole"
  }

  user_data = filebase64("${path.module}/scripts/ecs_launch_script.sh")

  tags = var.tags
}

resource "aws_autoscaling_group" "ecs_asg" {
  vpc_zone_identifier = var.vpc_subnets
  desired_capacity    = 1
  max_size            = 2
  min_size            = 1

  launch_template {
    id      = aws_launch_template.ecs_micro_template.id
    version = "$Latest"
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}

resource "aws_lb" "ecs_lb" {
  name               = "ecs-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = var.vpc_security_group_ids
  subnets            = var.vpc_subnets

  tags = var.tags
}

resource "aws_route53_zone" "frontend_zone" {
  name = "frontend"
}

resource "aws_acm_certificate" "cert" {
  domain_name = aws_route53_zone.frontend_zone.name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = var.tags
}

resource "aws_lb_listener" "ecs_alb_listener" {
  load_balancer_arn = aws_lb.ecs_lb.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate.cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_tg.arn
  }
}

resource "aws_lb_target_group" "ecs_tg" {
  name        = "ecs-target-group"
  port        = 443
  protocol    = "TCP"
  target_type = "ip"
  vpc_id      = var.vpc_id

  health_check {
    path = "/"
  }
}

resource "aws_ecs_cluster" "ecs_cluster" {
  name = "frontend-ecs-cluster"
}

resource "aws_ecs_capacity_provider" "ecs_capacity_provider" {
  name = "ecs_capacity_provider"

  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.ecs_asg.arn

    managed_scaling {
      maximum_scaling_step_size = 1000
      minimum_scaling_step_size = 1
      status                    = "ENABLED"
      target_capacity           = 2
    }
  }
}

resource "aws_ecs_cluster_capacity_providers" "ecs_cluster_capacity_providers" {
  cluster_name = aws_ecs_cluster.ecs_cluster.name

  capacity_providers = [aws_ecs_capacity_provider.ecs_capacity_provider.name]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = aws_ecs_capacity_provider.ecs_capacity_provider.name
  }
}

data "aws_iam_policy" "ecs_task_execution_policy" {
  name = "AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : [
            "ecs-tasks.amazonaws.com"
          ]
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })

  managed_policy_arns = [data.aws_iam_policy.ecs_task_execution_policy.arn]
}

resource "aws_ecs_task_definition" "ecs_task_definition" {
  family             = "frontend"
  network_mode       = "awsvpc"
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  cpu                = 256
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
  container_definitions = jsonencode([
    {
      name      = "dockergs"
      image     = "${aws_ecr_repository.frontend_ecr_repository.arn}:${random_string.docker_image_tag.result}"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 443
          hostPort      = 443
          protocol      = "TCP"
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "frontend_ecs_service" {
  name            = "frontend-ecs-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  desired_count   = 1

  network_configuration {
    subnets         = var.vpc_subnets
    security_groups = var.vpc_security_group_ids
  }

  force_new_deployment = true
  placement_constraints {
    type = "distinctInstance"
  }

  triggers = {
    redeployment = timestamp()
  }

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.ecs_capacity_provider.name
    weight            = 100
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.ecs_tg.arn
    container_name   = "dockergs"
    container_port   = 443
  }

  depends_on = [aws_autoscaling_group.ecs_asg]
}
