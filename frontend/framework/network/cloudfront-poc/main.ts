import { Construct } from "constructs";
import { App, TerraformStack, TerraformVariable } from "cdktf";
import { CloudfrontDistribution } from "@cdktf/provider-aws/lib/cloudfront-distribution";
import { AcmCertificate } from "@cdktf/provider-aws/lib/acm-certificate";
import { AcmCertificateValidation } from "@cdktf/provider-aws/lib/acm-certificate-validation";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    const bucketName = new TerraformVariable(this, "bucket_name", {
      type: "string",
      default: "domain.com"
    });
  
    const domainName = new TerraformVariable(this, "domain_name", {
      type: "string",
      default: "domain.com"
    });

    const BACKET_NAME = bucketName.value
      const DOMAIN_NAME = domainName.value

      const acmCertificate = new AcmCertificate(this, "tls_cert", {
        domainName: DOMAIN_NAME,
        validationMethod: "EMAIL"
    });
    

  
    const acmCertificateValidation = new AcmCertificateValidation(
      this,
      "cert_validation",
      {
        certificateArn: acmCertificate.arn
      }
    );

    const cloudfrontDistribution = new CloudfrontDistribution(this, "s3_distribution", {
      defaultRootObject: "index.html",
      enabled: true,
      isIpv6Enabled: true,
      aliases: [DOMAIN_NAME],
      origin: [
        { 
          originId: BACKET_NAME,
          domainName: DOMAIN_NAME,
          customOriginConfig: {
            httpPort: 80,
            httpsPort:443,
            originProtocolPolicy: "http-only",
            originSslProtocols: ["TLSv1", "TLSv1.1", "TLSv1.2"]

            
          }
        },
      ],

      defaultCacheBehavior: {
        allowedMethods: ["GET","HEAD"],
        cachedMethods: ["GET", "HEAD"],
        defaultTtl: 3600,
        forwardedValues: {
          cookies: {
            forward: "none",
          },
          queryString: false,
        },
        maxTtl: 86400,
        minTtl: 0,
        targetOriginId: BACKET_NAME,
        viewerProtocolPolicy: "allow-all",
      },

      restrictions: {
        geoRestriction: {
          // locations: ["US", "CA", "GB", "DE"],
          restrictionType: "none",
        },
      },
      viewerCertificate: {
        acmCertificateArn: acmCertificateValidation.certificateArn,
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1",
        cloudfrontDefaultCertificate: false
      },
    });
  }
}

const app = new App();
new MyStack(app, "cloudfront-poc");
app.synth();
