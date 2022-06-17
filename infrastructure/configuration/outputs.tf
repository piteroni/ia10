output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.works_cdn.domain_name
}
