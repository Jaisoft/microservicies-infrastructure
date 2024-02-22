Terraform AWS RDS Example

This folder contains a simple Terraform module that deploys a database instance (MySQL by default) in AWS to demonstrate how you can use Terratest to write automated tests for your AWS Terraform code. This module deploys an RDS Instance and associates it with an option group and parameter group to customize it.

Check out test/terraform_aws_rds_example_test.go to see how you can write automated tests for this module and validate the configuration of the parameters and options.

This module does not use the database instance created in any way. It can be used though to validate any combination of inputs passed while creating database instances in AWS RDS. Hence the plain text simple password used here should not have any security implications.

WARNING: This module and the automated tests for it deploy real resources into your AWS account which can cost you money. The resources are all part of the AWS Free Tier, so if you haven't used that up, it should be free, but you are completely responsible for all AWS charges.
Running this module manually

    Sign up for AWS.
    Configure your AWS credentials using one of the supported methods for AWS CLI tools, such as setting the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables. If you're using the ~/.aws/config file for profiles then export AWS_SDK_LOAD_CONFIG as "True".
    Set the AWS region you want to use as the environment variable AWS_DEFAULT_REGION.
    Install Terraform and make sure it's on your PATH.
    Run terraform init.
    Run terraform apply.
    When you're done, run terraform destroy.

Running automated tests against this module

    Sign up for AWS.
    Configure your AWS credentials using one of the supported methods for AWS CLI tools, such as setting the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables. If you're using the ~/.aws/config file for profiles then export AWS_SDK_LOAD_CONFIG as "True".
    Install Terraform and make sure it's on your PATH.
    Install Golang and make sure this code is checked out into your GOPATH.
    cd test
    dep ensure
    go test -v -run TestTerraformAwsRdsExample

