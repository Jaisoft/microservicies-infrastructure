/**
 * IAM policies for the saintsxctf infrastructure
 * Author: Andrew Jarombek
 * Date: 2/15/2019
 */

provider "aws" {
  region = "eu-west-3"
}



# ---------
# IAM Roles
# ---------

resource "aws_iam_role" "rds-access-role" {
  name = "rds-access-role"
  path = "/saintsxctf/"
  assume_role_policy = file("/Users/jaisoft/Documents/data/mysql/mysqldump-lambda/iam/policies/assume-role-policy.json")
}

resource "aws_iam_role_policy_attachment" "rds-access-role-policy" {
  policy_arn = aws_iam_policy.rds-access-policy.arn
  role = aws_iam_role.rds-access-role.name
}

resource "aws_iam_role" "s3-access-role" {
  name = "s3-access-role"
  path = "/saintsxctf/"
  assume_role_policy = file("/Users/jaisoft/Documents/data/mysql/mysqldump-lambda/iam/policies/assume-role-policy.json")
}

resource "aws_iam_role_policy_attachment" "s3-access-role-policy" {
  policy_arn = aws_iam_policy.s3-access-policy.arn
  role = aws_iam_role.s3-access-role.name
}

# ------------
# IAM Policies
# ------------

resource "aws_iam_policy" "rds-access-policy" {
  name = "rds-access-policy"
  path = "/saintsxctf/"
  policy = file("/Users/jaisoft/Documents/data/mysql/mysqldump-lambda/iam/policies/rds-access-policy.json")
}

resource "aws_iam_policy" "s3-access-policy" {
  name = "s3-access-policy"
  path = "/saintsxctf/"
  policy = file("/Users/jaisoft/Documents/data/mysql/mysqldump-lambda/iam/policies/s3-access-policy.json")
}