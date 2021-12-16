import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import * as path from "path";

export class MurmurateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'MurmurationBucket', {
	    versioned: false,
	    removalPolicy: cdk.RemovalPolicy.DESTROY,
	    autoDeleteObjects: true,
	    enforceSSL: true,
    });


    const fn = new lambda.DockerImageFunction(this, 'EventDrop', {
	    code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '..')),
    });

    fn.addEventSource(new S3EventSource(bucket, {
	    events: [ s3.EventType.OBJECT_CREATED, s3.EventType.OBJECT_REMOVED ],
    }));
  }
}
