variable "identifier" {
  description = "the name of the database instance "
  type        = string
}


variable "engine" {
  description = "the database engine to use"
  type        = string
}

variable "engine_version" {
  description = "the version of the database engine"
  type        = string
}

variable "instance_class" {
  description = "the instance type to use for the database instance"
  type        = string
}

variable "allocated_storage" {
  description = "the allocated storage in gigabytes for the database instance"
  type        = number
}

variable "username" {
  description = "the username for the database instance"
  type        = string
}

variable "password" {
  description = "the password for the database instance"
  type        = string
}

variable "tags" {
  description = "A Collection of tags to apply to the Database Instance"
  type        = map(string)
}