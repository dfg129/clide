import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
// import { NodejsFunction } from 'aws-lambda-nodejs';
// import {HttpApi, HttpMe:thod} from 'aws-cdk-lib';
// import { LambdaProxyIntegration } from 'aws-cdk-lib';


export class EnvironmentStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      this.vpc = new ec2.Vpc(this, 'CafeVPC', {
      cidr: '10.0.0.0/16',
      maxAzs: 2, 
      subnetConfiguration: [
        {
          name: 'private-subnet-1',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
          cidrMask: 24,
        },
        {
          name: 'public-subnet-1',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'isolated-subnet-1',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 28,
        }
      ],
      natGatewayProvider: ec2.NatProvider.instance({
        instanceType: new ec2.InstanceType('t2.micro'),
      }),      
    });

    cdk.Aspects.of(this.vpc).add(new cdk.Tag('Name', 'cafe-vpc'));

    let sec_vpc = this.vpc;
    const securityGroup = new ec2.SecurityGroup(this, 'security-group-id', { vpc: sec_vpc });

    let tagSubnets = (subnets: ec2.ISubnet[], tagName: string, tagValue: string)  => {
      for (const subnet of subnets) {
        cdk.Aspects.of(subnet).add(new cdk.Tag(tagName, tagValue));
      }

    tagSubnets(this.vpc.privateSubnets, 'Name', `cafe-vpc-private-`);
    tagSubnets(this.vpc.privateSubnets, 'Name', `cafe-vpc-public-`);
  }

//  const dockerfile = path.join(__dirname, "..");

//  new lambda.DockerImageFunction(this, 'docker-function', {
//    code: lambda.DockerImageCode.fromImageAsset(dockerfile, {
//     cmd: [ "handler.run" ],
//      entrypoint: ["/lambda-entrypoint.sh"],
//      }),
//  });


  // const handler = new NodejsFunction(this, "cafe-lambda", {
  //     bundling: {
  //       forceDockerBundling: true,
  //     },
  //     memorySize: 1024,
  //     timeout: cdk.Duration.seconds(5),
  //     handler: 'handler',
  //     runtime: lambda.Runtime.NODEJS_14_X,
  //     entry: path.join(__dirname, `/../handlers/index.ts`),
  // });

  // const handlerIntegration = new LambdaProxyIntegration({
  //   handler: handler,
  // });

 }
}
