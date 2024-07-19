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
    command = "${path.module}/scripts/docker.sh ${var.region} ${var.aws_account_id} ${path.module} ${aws_ecr_repository.frontend_ecr_repository.name} ${random_string.docker_image_tag.result}"
  }
}

# data "aws_subnet" "aws_vpc_subnet" {
#   vpc_id            = var.vpc_id
#   availability_zone = "eu-central-1a"
# }

# resource "aws_security_group" "frontend_security_group" {
#   name        = "frontend_security_group"
#   description = "Security group to enable frontend internet access"

#   vpc_id = var.vpc_id

#   ingress {
#     from_port = 443
#     to_port   = 443

#     protocol = "https"

#     ipv6_cidr_blocks = ["::/0"]
#   }

#   egress {
#     from_port = 443
#     to_port   = 443

#     protocol = "https"

#     ipv6_cidr_blocks = ["::/0"]
#   }

#   tags = var.tags
# }

# resource "aws_instance" "frontend_ec2_instance" {
#   ami                         = "ami-0346fd83e3383dcb4"
#   associate_public_ip_address = true
#   availability_zone           = "eu-central-1"
#   instance_type               = "t2.micro"
#   vpc_security_group_ids      = var.vpc_security_group_ids
#   subnet_id                   = data.aws_subnet.aws_vpc_subnet.id

#   user_data = file("${path.module}/scripts/ec2_launch_script.sh")

#   tags = var.tags
# }
