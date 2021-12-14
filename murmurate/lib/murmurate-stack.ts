import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import * as path from "path";

export class MurmurateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'MurmurationBucket', {
	    versioned: false,
	    removalPolicy: cdk.RemovalPolicy.DESTROY,
	    autoDeleteObjects: true,
	    enforceSSL: true,
    });


    new lambda.DockerImageFunction(this, 'EventDrop', {
	    code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, 'app'),
    });
  }
}
