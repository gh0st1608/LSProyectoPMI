/*
module "vpc" {
  source = "./vpc"
  vpc_id = module.vpc.vpc_id
}
*/

module "security_group" {
  source = "./security_group"
  #vpc_id = module.vpc.vpc_id
}

module "key_pair" {
  source = "./key_pair"
}

module "s3" {
  source = "./s3"
}

module "ec2" {
  source   = "./ec2"
  key_name = module.key_pair.key_name
  #vpc_id            = module.vpc.vpc_id
  security_group_id = module.security_group.security_group_id
  #public_subnet_id  = module.vpc.public_subnet_id

}

module "elastic_ip" {
  source = "./elastic_ip"

  ec2_instance_id = module.ec2.ec2_instance_id
}
