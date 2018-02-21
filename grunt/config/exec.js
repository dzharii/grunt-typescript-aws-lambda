module.exports = {
      BuildSourceTypescript: {
        cmd: 'tsc -p ./tsconfig.json',
        cwd: '<%= SourceRoot %>'
      },
      AwsCreateLambdaCfnTemplate: {
        cmd: ['aws cloudformation create-stack',
              ' --stack-name "<%= LambdaCfnStackName %>"',
              ' --template-body file://./cloudformation/<%= LambdaCfnFileName %>',
              ' --capabilities CAPABILITY_IAM --region=us-west-2'
        ].join(''),
        cwd: '<%= ProjectRoot %>'
      },
      AwsDeleteLambdaCfnTemplate: {
        cmd: ['aws cloudformation delete-stack',
              ' --stack-name "<%= LambdaCfnStackName %>"',
              ' --region=us-west-2'
        ].join(''),
        cwd: '<%= ProjectRoot %>'
      },
      AwsWaitCreateLambdaCfnTemplate: {
        cmd: ['aws cloudformation wait stack-create-complete',
              ' --stack-name "<%= LambdaCfnStackName %>"',
              ' --region=us-west-2'
        ].join(''),
        cwd: '<%= ProjectRoot %>'
      },
      AwsUpdateLambdaCfnTemplate: {
        cmd: ['aws cloudformation update-stack',
              ' --stack-name "<%= LambdaCfnStackName %>"',
              ' --template-body file://./cloudformation/<%= LambdaCfnFileName %>',
              ' --capabilities CAPABILITY_IAM --region=us-west-2'
        ].join(''),
        cwd: '<%= ProjectRoot %>'
      },
      AwsUpdateLambdaFunction: {
        cmd: ['aws lambda update-function-code ',
              ' --region us-west-2',
              ' --function-name "<%= LambdaFunctionName %>"',
              ' --zip-file fileb://lambda-function.zip'
        ].join(''),
        cwd: '<%= DistDir %>'
      }
};