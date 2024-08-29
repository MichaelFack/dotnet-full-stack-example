resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"

        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

data "archive_file" "lambda" {
  type        = "zip"
  source_file = var.source_file_path
  output_path = "${var.lambda_name}_lambda.zip"
}

resource "aws_lambda_function" "lambda" {
  filename      = "${var.lambda_name}_lambda.zip"
  function_name = var.lambda_name
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = var.lambda_namespace # We're using executable assembly handler; handler name should match the namespace
  layers        = var.layer_arns

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "dotnet8"

  environment {
    variables = var.env_vars
  }
}
