import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import  * as path from 'path'


export class StarlingsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const asset = new DockerImageAsset(this, 'StarlingImage', {
        directory: path.join(__dirname, '../assets')
      });


    const ssmuri = new ssm.StringParameter(this, 'StarlingAssetURI', {
	    description: 'The uri to the container repo for starlings',
	    parameterName: 'StarlingURI',
	    stringValue: asset.imageUri,
      });
  }
}
