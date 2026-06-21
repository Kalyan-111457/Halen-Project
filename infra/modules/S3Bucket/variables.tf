variable "storage_bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}


variable "tags" {
  description = "A Collection of tags to apply to the S3 Bucket"
  type        = map(string)
}
