variable "tags" {
  type = map(string)
}

variable "vpc_id" {
  type = string
}

variable "vpc_security_group_ids" {
  type = list(string)
}

variable "region" {
  type = string
}

variable "aws_account_id" {
  type = string
}
