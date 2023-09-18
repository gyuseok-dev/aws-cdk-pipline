#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();

new PipelineStack(app, `pipeline-stack`, {
  // 다른 계정으로 실행시 에
  env: { account: '080133995043', region: 'ap-northeast-2' }, 
})