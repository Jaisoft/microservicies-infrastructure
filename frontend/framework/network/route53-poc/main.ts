import { Construct } from "constructs";
import { App, TerraformStack, TerraformVariable } from "cdktf";
import { Route53Zone } from "@cdktf/provider-aws/lib/route53-zone";
import { Route53Record } from "@cdktf/provider-aws/lib/route53-record";
import { DataAwsCloudfrontDistribution } from "@cdktf/provider-aws/lib/data-aws-cloudfront-distribution";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const domainName = new TerraformVariable(this, "domain_name", {
      type: "string",
      default: "domain.com"
    });

    const DOMAIN_NAME = domainName.value

 
    const route53Zone = new Route53Zone(this, "bucket_for_frontend_route53_zone", {
      name: "seahorsefactory.io"
    });

    const cloudfrontDistribution = new DataAwsCloudfrontDistribution(this, "test", {
      id: "EDFDVBD632BHDS5",
    });


    new Route53Record(this, "bucket_for_frontend_route53_record", {
      name: DOMAIN_NAME,
      type: "A",
      zoneId: route53Zone.zoneId,
      alias: {
        name                   : cloudfrontDistribution.domainName,
        zoneId                : cloudfrontDistribution.hostedZoneId,
        evaluateTargetHealth : false
      }
      
    });


  }

}

const app = new App();
new MyStack(app, "route53-poc");
app.synth();
