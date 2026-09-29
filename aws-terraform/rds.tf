# DB Subnet Group (Place RDS in Private Subnets)
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "health-scheme-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "health-scheme-db-subnet-group"
  }
}

# PostgreSQL Database Instance
resource "aws_db_instance" "postgres" {
  identifier           = "health-scheme-db"
  allocated_storage    = 20
  storage_type         = "gp3"
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.t4g.micro" # Free-tier eligible / low cost
  db_name              = "health_scheme"
  username             = "postgres"
  password             = "postgres_secure_password_123" # In prod, use AWS Secrets Manager
  parameter_group_name = "default.postgres16"
  skip_final_snapshot  = true # Set to false in real production
  
  # Network & Security
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az               = false # Set to true for production high-availability

  tags = {
    Name = "health-scheme-postgres"
  }
}
