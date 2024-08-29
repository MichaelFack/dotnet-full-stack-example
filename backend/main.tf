module "random_number_lambda" {
  source = "../iac/terraform/modules/lambda"

  lambda_name      = "random_number"
  lambda_namespace = "Fack.Lambdas.RandomNumber"
  layer_arns       = []
  source_file_path = "${path.module}/lambdas/RandomNumber/bin/Release/net8.0/RandomNumber.exe"
  env_vars = {

  }

  tags = var.tags
}

resource "aws_db_subnet_group" "subnet_group" {
  name = "backend"
  subnet_ids = var.main_vpc.subnet_ids
  tags = var.tags
}

resource "aws_db_instance" "db" {
  db_name                     = "backend_db"
  instance_class              = "db.t3.micro"
  engine                      = "mysql"
  engine_version              = "8.0"
  manage_master_user_password = true
  username                    = "admin"
  allocated_storage           = 10
  db_subnet_group_name        = aws_db_subnet_group.subnet_group.name
  tags = var.tags
}

data "aws_secretsmanager_secret" "db_secret" {
  arn = aws_db_instance.db.master_user_secret[0].secret_arn
}

data "aws_secretsmanager_secret_version" "db_secret" {
  secret_id = data.aws_secretsmanager_secret.db_secret.id
}

locals {
  DatabaseEnvironmentVariables = {
    DatabaseConnectionString = "server=${aws_db_instance.db.endpoint};uid=${aws_db_instance.db.username};pwd=${data.aws_secretsmanager_secret_version.db_secret.secret_string};database=backend"
  }
}
