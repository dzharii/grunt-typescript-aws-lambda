/*
    exports function that returns final and merged configuration 
    that you can use as your grunt "data" 

    Example: 

    const getConfig = require('./Gruntconfig.js')
    let config = getGruntConfig(grunt);

*/
const path = require('path');
const fs = require('fs');

module.exports = function(grunt) {
  let env = grunt.option('env') || "default";

  let environments = [
    {
      applyTo: "all",
      ProjectRoot: __dirname, 
      SourceRoot:  path.join('<%= ProjectRoot %>', 'source'),
      BuildDir: path.join('<%= ProjectRoot %>', '_build'),
      DistDir: path.join('<%= ProjectRoot %>', '_dist'),
      LocalFunctionDistArchive: path.join('<%= DistDir %>', 'lambda-function.zip'),
      LambdaCfnTemplateGeneratorPath: path.join('<%= ProjectRoot %>', 'cloudformation', 'scheduled-lambda.js'),
      LambdaCfnFileName: 'scheduled-lambda-generated.json',
      LambdaCfnTemplatePath: path.join('<%= ProjectRoot %>', 'cloudformation', '<%= LambdaCfnFileName %>'),
      LambdaCfnStackName: "cloudwatch-event-scheduled-lambda",
      LambdaFunctionName: "cloudwatch-event-scheduled-lambda"

    },
    {
      applyTo: "default",

    },    
    {
      applyTo: "stage",
      LambdaCfnStackName: "cloudwatch-event-scheduled-lambda-stage",
      LambdaFunctionName: "cloudwatch-event-scheduled-lambda-stage"
    }
    
  ];

  let finalMergedConfig = {};
  let mergeCount = 0;

  for (let entry of environments) {
    
    if (!entry.applyTo) {
      continue;
    }

    let applyTo = entry.applyTo;

    let matchesEnv = (applyTo === env);
    let shouldMerge =  applyTo === 'all' || matchesEnv;
                          
    if (shouldMerge) {
      finalMergedConfig = Object.assign(finalMergedConfig, entry);
    }
    if (matchesEnv) {
      mergeCount++;
    }
  }
  if (mergeCount === 0) {
    grunt.fail.fatal(`The parameter env <${env}> does not match any existing environment configuration`);
  }
  return finalMergedConfig;
}