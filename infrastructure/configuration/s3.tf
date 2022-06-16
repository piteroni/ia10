resource "aws_s3_bucket" "ia10_work" {
  bucket = var.s3_bucket_name
}

resource "aws_s3_bucket_acl" "ia10_work" {
  bucket = aws_s3_bucket.ia10_work.id
  acl    = "public-read"
}

resource "aws_s3_bucket_cors_configuration" "ia10_work" {
  bucket = aws_s3_bucket.ia10_work.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = var.allow_origins
    max_age_seconds = 3000
  }
}
