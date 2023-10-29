


resource "aws_s3_bucket" "bucket_pmi_s3" {
  bucket = var.bucket_name
  tags = {
    Name        = "terraform_buckets3"
    Environment = "prod"
  }
}

resource "aws_s3_bucket_ownership_controls" "bucket_pmi_s3_ownership_controls" {
  bucket = aws_s3_bucket.bucket_pmi_s3.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket_pmi_s3_public_access_block" {
  bucket = aws_s3_bucket.bucket_pmi_s3.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "bucket_pmi_s3_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.bucket_pmi_s3_ownership_controls,
    aws_s3_bucket_public_access_block.bucket_pmi_s3_public_access_block,
  ]

  bucket = aws_s3_bucket.bucket_pmi_s3.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "allow_get_object" {
  bucket = aws_s3_bucket.bucket_pmi_s3.id
  policy = data.aws_iam_policy_document.allow_get_object.json
}

data "aws_iam_policy_document" "allow_get_object" {
  statement {
    sid       = ""
    effect    = "Allow"
    resources = ["arn:aws:s3:::proyectoqrprod/*"]
    actions   = ["s3:GetObject"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

# https://flosell.github.io/iam-policy-json-to-terraform/