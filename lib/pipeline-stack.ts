import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)
        new cdk.pipelines.CodePipeline(this, 'Pipeline', {
            pipelineName: `test-pipeline`,
            synth: new cdk.pipelines.ShellStep('Synth', {
                input: cdk.pipelines.CodePipelineSource.gitHub(
                    'gyuseok-dev/nestjs-aws-lambda', // owner/repo
                    'main', // branch
                    {
                        authentication: cdk.SecretValue.secretsManager('github-token'), 
                    }
                ),
                env: {
                    // 적절한 권한이 있는 iam key를 부여
                    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '', 
                    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
                    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION ?? '',
                    AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID ?? '',
                },
                installCommands: [
                    'npm install -g serverless', // dependency install
                    'serverless plugin install -n serverless-plugin-typescript'
                ],
                commands: [
                    'serverless deploy', // deploy
                ],
            }),
            selfMutation: false, 

        })
    }
}
