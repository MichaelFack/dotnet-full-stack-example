data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

resource "aws_default_vpc" "default_vpc" {
  tags = local.tags
}
