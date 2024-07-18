module "frontend" {
  source = "../../frontend"

  aws_account_id         = data.aws_caller_identity.current.account_id
  region                 = data.aws_region.current.name
  vpc_id                 = aws_default_vpc.default_vpc.id
  vpc_security_group_ids = [aws_default_vpc.default_vpc.default_security_group_id]

  tags = local.tags
}
