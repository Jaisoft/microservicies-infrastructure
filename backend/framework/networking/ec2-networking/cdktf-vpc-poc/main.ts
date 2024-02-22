import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsProvider } from "./.gen/providers/aws/provider";
// import { Instance } from "./.gen/providers/aws/instance"
import { Vpc } from "./.gen/modules/vpc";


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "eu-west-1",
    });

    new Vpc(this, "MyVpc", {
      name: "my-vpc",
      cidr: "10.0.0.0/16",
      azs: ["eu-west-1a", "eu-west-1b", "eu-west-1c"],
      privateSubnets: ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"],
      publicSubnets: ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"],
      enableNatGateway: true,
    });

    // const ec2Instance = new Instance(this, "compute", {
    //   ami: "ami-01456a894f71116f2",
    //   instanceType: "t2.micro",
    // });
  }
}

const app = new App();
new MyStack(app, "cdktf-poc");
app.synth();
