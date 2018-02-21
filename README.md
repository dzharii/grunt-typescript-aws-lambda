## Description

Dev: AWS Lambda function reads the latest AWS status updates  
Ops: Cloudformation + Grunt build commands to build and deploy lambda function

## Prerequisites 

* Ensure aws cli is installed on the local workstation
* Install the latest [NodeJs](https://nodejs.org/en/) (or at least version 6.10 or higher)
* Install the latest [VS Code](https://code.visualstudio.com/). This editor has the best typescript experience. This step is optional, but highly recommended.
* NPM: Install global grunt and grunt-cli: sudo `npm i -g grunt grunt-cli`
* NPM: Install global typescript: sudo `npm i -g typescript`

## Folder structure

`cloudformation` -- contains AWS lambda + Cloudwatch Event  cloudformation scripts
`source`  -- typescript lambda source code
`Gruntfile.js`, `MyBuildConfig.js`, `grunt/config`, `grunt/tasks`  -- build and deployment scripts


## Build 

### Restore node_modules: 

Restore grunt dependencies: 
cd `grunt-typescript-aws-lambda`

Run `npm i`

Restore lambda dependencies: 
cd `source` (`grunt-typescript-aws-lambda`/`source`)

Run `npm i`

Return back to the project root: 
cd `grunt-typescript-aws-lambda`

### Deploy cloudformation stack
`grunt-typescript-aws-lambda$>` `grunt cfn-create`

### Publish lambda to AWS: 
`grunt-typescript-aws-lambda$>` `grunt lambda-publish`










