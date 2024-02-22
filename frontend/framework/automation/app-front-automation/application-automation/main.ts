import { Construct } from "constructs";
import { App, Fn, TerraformStack, Token } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { CodecommitRepository } from "@cdktf/provider-aws/lib/codecommit-repository";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { IamRolePolicy } from "@cdktf/provider-aws/lib/iam-role-policy";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { Codepipeline } from "@cdktf/provider-aws/lib/codepipeline";
import { CodebuildProject } from "@cdktf/provider-aws/lib/codebuild-project";
import { KmsKey } from "@cdktf/provider-aws/lib/kms-key";


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

////////PROVIDER////////////////////////////////////////////////////////////
new AwsProvider(this, "aws", {
  region: "eu-west-1",
});


////////////////////////////////CODECOMMIT//////////////////////////////////////////////////////////
new CodecommitRepository(this, "frontend-infrastructure", {
      description: "This is the source repository for front-end infrastructure",
      repositoryName: "frontend-infrastructure",
});
    
    
////////////////////////////////CODEPIPELINE//////////////////////////////////////////////////////////
const codepipelineBucket = new S3Bucket(this, "frontend-infrastructure-codepipeline", {
      bucket: "frontend-infrastructure-codepipeline",
});

 
const codepipelineRole = new IamRole(this, "frontend-infrastructure-codepipeline-role", {   
      name: "frontend-infrastructure-codepipeline-role",
      assumeRolePolicy:`{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Effect": "Allow",
          "Principal": {
            "Service": [
              "codepipeline.amazonaws.com"
            ]
          }
        }
      ]
    }
  `
});

  
new IamRolePolicy( this, "frontend-infrastructure-codepipeline-policy",{
        name: "frontend-infrastructure-codepipeline-policy",
        role: codepipelineRole.id,
        policy:`{
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "S3",
              "Effect": "Allow",
              "Action": [
                "s3:*"
              ],
              "Resource": [
                "${codepipelineBucket.arn}",
                "${codepipelineBucket.arn}/*"
              ]
            },
            {
              "Sid": "CodeBuild",
              "Effect": "Allow",
              "Action": [
                "codebuild:BatchGetBuilds", 
                "codebuild:StartBuild"
              ],
              "Resource": [
                "*"
              ]
            },
            {
              "Sid": "CodeCommit",
              "Effect": "Allow",
              "Action": [
                "codecommit:GitPull",
                "codecommit:GetPullRequest",
                "codecommit:GetBranch",
                "codecommit:GetCommit",
                "codecommit:UploadArchive",
                "codecommit:GetUploadArchiveStatus"
              ],
              "Resource": [
                "*"
              ]
            },
            {
              "Sid": "KMS",
              "Effect": "Allow",
              "Action": [
                "kms:*"
              ],
              "Resource": [
                "*"
              ]
            }

          ]
        }`        
  }
);

const kmsKey = new KmsKey(this, "a", {
      deletionWindowInDays: 10,
      description: "KMS key 1",
    });


new Codepipeline(this, "frontend-infrastructure-pipeline", {
      name: "frontend-infrastructure-pipeline",
      roleArn: codepipelineRole.arn,
      artifactStore: [
        {
          location: codepipelineBucket.bucket,
          type: "S3",
          encryptionKey: {
            id: Token.asString(kmsKey.arn),
            type: "KMS",
          },
        },
       
      ],
      

      stage: [
        {
          name: "Source",
          action: [
            {
              category: "Source",
              name: "Source",
              outputArtifacts: ["source_output"],
              owner: "AWS",
              provider: "CodeCommit",
              version: "1",
              configuration: {
                BranchName: "master",
                RepositoryName: "frontend-infrastructure"
              }
            },
          ],
        },
        {
          name: "Build",
          action: [
            {
              category: "Build",
              configuration: {
                ProjectName: "frontend-infratructure-build",
              },
              inputArtifacts: ["source_output"],
              name: "Build",
              outputArtifacts: ["build_output"],
              owner: "AWS",
              provider: "CodeBuild",
              version: "1",
            },
          ],
          
        },
        {
          name: "Deploy",
          action: [
            {
              category: "Build",
              configuration: {
                ProjectName: "frontend-infratructure-deploy",
              },
              inputArtifacts: ["build_output"],
              name: "Deploy",
              outputArtifacts: ["deploy_output"],
              owner: "AWS",
              provider: "CodeBuild",
              version: "1",
            },
          ],
          
        }
      ],
    });


///////////////////////////////CODEBUILD//////////////////////////////////////////////////////////
const codebuildIamRole = new IamRole(this, "frontend-infrastructure-codebuild-role", {
      name: "frontend-infrastructure-codebuild-role",
      assumeRolePolicy:`{
        "Version": "2012-10-17",
        "Statement": [
          {
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": {
              "Service": [
                "codebuild.amazonaws.com"
              ]
            }
          }
        ]
      }
    `
});

new IamRolePolicy(this, "frontend-infrastructure-codebuild-policy", {
      name: "frontend-infrastructure-codebuild-policy",
      role: codebuildIamRole.id,
      policy:`{
        "Statement": [
            {
                "Sid": "S3",
                "Effect": "Allow",
                "Resource": [
                    "${codepipelineBucket.arn}",
                    "${codepipelineBucket.arn}/*"
                ],
                "Action": [
                    "s3:*"
                ]
            },
            {
                "Sid": "CodeBuild",
                "Effect": "Allow",
                "Resource": [
                    "*"
                ],
                "Action": [
                    "codebuild:*"
                ]
            },
            {
                "Sid": "CloudWatch",
                "Effect": "Allow",
                "Resource": [
                    "*"
                ],
                "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ]
            },
            {
              "Sid": "KMS",
              "Effect": "Allow",
              "Action": [
                "kms:*"
              ],
              "Resource": [
                "*"
              ]
            }
        ]
    }`
});
   


//Build
new CodebuildProject(this, "frontend-infratructure-build", {
      name: "frontend-infratructure-build",
      description: "frontend-infrastructure-build",
      serviceRole: codebuildIamRole.arn,
      buildTimeout: Token.asNumber("5"),
      queuedTimeout: Token.asNumber("5"),
      encryptionKey: kmsKey.arn,

      artifacts: {
        type: "CODEPIPELINE",
      },
      
      cache: {
        modes: ["LOCAL_DOCKER_LAYER_CACHE", "LOCAL_SOURCE_CACHE"],
        type: "LOCAL",
      },
      
      environment: {
        computeType: "BUILD_GENERAL1_SMALL",
        image: "aws/codebuild/amazonlinux2-x86_64-standard:4.0",
        imagePullCredentialsType: "CODEBUILD",
        privilegedMode: false,
        type: "LINUX_CONTAINER"
      },

      source: {
        buildspec: Fn.file(`${process.cwd()}/buildspec-build.yaml`),
        type: "CODEPIPELINE",
      }
});

//Build
new CodebuildProject(this, "frontend-infratructure-deploy", {
      name: "frontend-infratructure-deploy",
      description: "frontend-infrastructure-deploy",
      serviceRole: codebuildIamRole.arn,
      buildTimeout: Token.asNumber("5"),
      queuedTimeout: Token.asNumber("5"),
      encryptionKey: kmsKey.arn,

      artifacts: {
        type: "CODEPIPELINE",
      },
  
      cache: {
        modes: ["LOCAL_DOCKER_LAYER_CACHE", "LOCAL_SOURCE_CACHE"],
        type: "LOCAL",
      },
  
      environment: {
        computeType: "BUILD_GENERAL1_SMALL",
        image: "aws/codebuild/amazonlinux2-x86_64-standard:4.0",
        imagePullCredentialsType: "CODEBUILD",
        privilegedMode: false,
        type: "LINUX_CONTAINER"
      },

      source: {
        buildspec: Fn.file(`${process.cwd()}/buildspec-deploy.yaml`),
        type: "CODEPIPELINE",
      }
});

  }
}

const app = new App();
new MyStack(app, "frontend-infrastructure-automation");
app.synth();
