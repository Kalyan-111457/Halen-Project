data "aws_region" "current" {}

resource "aws_db_instance" "postgres" {
  identifier             = var.identifier
  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  allocated_storage      = var.allocated_storage
  username               = var.username
  password               = var.password
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.db_access.id]
  publicly_accessible    = true
  tags                   = var.tags

}


resource "aws_security_group" "db_access" {
  name        = "postgres-sg"
  description = "Allow PostgreSQL access"
  region      = data.aws_region.current.region

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["103.120.51.102/32"] # Replace with your trusted IP range
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


