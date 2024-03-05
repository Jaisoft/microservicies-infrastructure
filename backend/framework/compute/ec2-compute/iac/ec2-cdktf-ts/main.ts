import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Instance } from "@cdktf/provider-aws/lib/instance";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "aws_region", {
      region: "eu-west-1",
    });

    new Instance(this, "web", {
      ami: "ami-0fef2f5dd8d0917e8",
      instanceType: "t3.micro",
      tags: {
        Name: "EC2-CDKTF-TS-POC",
      },
    });
  }
}

const app = new App();
new MyStack(app, "create-ec2-cdktf-ts");
app.synth();
