resource "aws_s3_bucket" "example" {
  # Let AWS append a globally unique suffix while Terraform keeps the
  # generated bucket name stable in state after the first successful apply.
  bucket_prefix = "${replace(lower(var.storage_bucket_name), "_", "-")}-"
  tags          = var.tags
}
