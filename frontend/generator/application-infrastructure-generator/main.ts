import { Construct } from "constructs";
import { App, TerraformStack, TerraformVariable} from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3BucketWebsiteConfiguration } from "@cdktf/provider-aws/lib/s3-bucket-website-configuration";
import { S3BucketPolicy } from "@cdktf/provider-aws/lib/s3-bucket-policy";
import { S3AccountPublicAccessBlock } from "@cdktf/provider-aws/lib/s3-account-public-access-block";
import { S3BucketCorsConfiguration } from "@cdktf/provider-aws/lib/s3-bucket-cors-configuration";
import { AcmCertificate } from "@cdktf/provider-aws/lib/acm-certificate";
import { AcmCertificateValidation } from "@cdktf/provider-aws/lib/acm-certificate-validation";
import { Route53Zone } from "@cdktf/provider-aws/lib/route53-zone";
import { Route53Record } from "@cdktf/provider-aws/lib/route53-record";
import { CloudfrontDistribution } from "@cdktf/provider-aws/lib/cloudfront-distribution";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
   super(scope, id);

     //PROVIDER///////////////////////////////////////////////////////////
     new AwsProvider(this, "aws_region", {
      region: "eu-west-1",
    });

    new AwsProvider(this, "aws_acm", {
      alias: "aws_acm",
      region: "us-east-1"
    });

    //VARIABLES//////////////////////////////////////////////////////////
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


    //STORAGE////////////////////////////////////////////////////////////
    
     const bucketForFrontend = new S3Bucket(this, "bucket_for_frontend", {
         bucket: BACKET_NAME
      });

     //website
     const s3BucketWebsiteConfiguration = new S3BucketWebsiteConfiguration(this, "bucket_for_frontend_configurations", {
        bucket: bucketForFrontend.id,
        indexDocument: {
          suffix: "index.html",
       }
      });

      
      //SECURITY//////////////////////////////////////////////////////////

      //Block PublicAcces dont working
      new S3AccountPublicAccessBlock(this, "bucket_for_frontend_public_access_block", {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets : false
      });

      //SECURITY//////////////////////////////////////////////////////////
      //Authorization
     
       new S3BucketPolicy(
        this,
        "bucket_for_frontend_bucket_policy",
        {
          bucket: bucketForFrontend.id,
          policy: `{
            "Version": "2012-10-17",
            "Statement": [
              {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                  "s3:GetObject"
                ],
                "Resource": [
                  "arn:aws:s3:::${BACKET_NAME}/*"
                ]
              }
            ]
          }`
        }
      );
      
      
      //SECURITY//////////////////////////////////////////////////////////
      //CORS
      new S3BucketCorsConfiguration(
        this,
        "bucket_for_frontend_cors",
        {
          bucket: bucketForFrontend.id,
          corsRule: [
            {
              allowedHeaders: ["*"],
              allowedMethods: ["GET", "POST"],
              allowedOrigins: [s3BucketWebsiteConfiguration.websiteEndpoint],
              exposeHeaders: ["ETag"],
              maxAgeSeconds: 3000,
            },
          ],
        }
      );

    
    //NETWORKING////////////////////////////////////////////////////////////
    //Route53 .com
    const route53Zone = new Route53Zone(this, "bucket_for_frontend_route53_zone", {
      name: "seahorsefactory.io"
    });
    

  


    //SECURITY//////////////////////////////////////////////////////////
    //SSL/TLS
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


    //NETWORKING////////////////////////////////////////////////////////////
    //CloudFront
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

      
    //NETWORKING////////////////////////////////////////////////////////////
    //Route53 .com    
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
new MyStack(app, "frontend-infrastructure");
app.synth();
