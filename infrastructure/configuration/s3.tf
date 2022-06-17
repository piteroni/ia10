resource "aws_s3_bucket" "ia10_work" {
  bucket = var.s3_bucket_name
}

resource "aws_s3_bucket_cors_configuration" "allow_ia_10_systems" {
  bucket = aws_s3_bucket.ia10_work.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = var.allow_origins
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "allow-cdn" {
  bucket = aws_s3_bucket.ia10_work.id
  policy = data.aws_iam_policy_document.allow-cdn.json
}

data "aws_iam_policy_document" "allow-cdn" {
  statement {
    sid    = "Allow CloudFront"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.works_cdn.iam_arn]
    }
    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.ia10_work.arn}/*"
    ]
  }
}
