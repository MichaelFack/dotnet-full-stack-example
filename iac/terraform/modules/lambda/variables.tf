variable "source_file_path" {
  description = "lambda .zip file path"
  type        = string
}

variable "lambda_name" {
  description = "lambda name"
  type        = string
}

variable "lambda_namespace" {
  description = "lambda C# namespace"
  type        = string
}

variable "layer_arns" {
  description = "lambda layer arns"
  type        = list(string)
}

variable "env_vars" {
  description = "environment variables"
  type        = map(string)
}

variable "tags" {
  type = map(string)
}
