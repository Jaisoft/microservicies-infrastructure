import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "aws_region", {
      region: "eu-west-1",
    });

    new S3Bucket(this, "bucket_for_frontend", {
      bucket: "bucket_for_frontend",
      tags: {
        Environment: "Dev",
        Name: "bucket_for_frontend",
      },
    });
  }
}

const app = new App();
new MyStack(app, "s3-poc");
app.synth();
