variable "s3_bucket_name" {
  type      = string
  sensitive = true
}

variable "allow_origins" {
  type      = list(string)
  sensitive = true
}
