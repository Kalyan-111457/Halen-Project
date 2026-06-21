module "common" {
  source = "../../modules/common"
}

module "s3_bucket" {
  source              = "../../modules/S3Bucket"
  storage_bucket_name = var.storage_bucket_name
  tags                = module.common.common_tags
}

module "database" {
  source            = "../../modules/Database"
  identifier        = var.identifier
  engine            = var.engine
  engine_version    = var.engine_version
  instance_class    = var.instance_class
  allocated_storage = var.allocated_storage
  username          = var.username
  password          = var.password
  tags              = module.common.common_tags
}
