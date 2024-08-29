variable "main_vpc" {
  type = object({
    arn        = string
    subnet_ids = list(string)
  })
}

variable "tags" {
  type = map(string)
}
