// Exports "getTemplate", a function that returns 
// Cloudformation JSON

// Oh... did you notice you can use comments inside the cloudformation template? Love you, JavaScript!

// If open this file in VS Code, @ts-check will help you to avoid some syntax mistakes
// @ts-check


/**
 * Returns a cloudformation template json for the lambda function.
 * @param {string} lambdaName - the name of the lambda function 
 */
module.exports = function getTemplate(lambdaName) { 
    // Now we can use some JavaScript's secret powers to define the function 
    // and then use handler.toString() to get the its body; 
    // Something like: 
    // "ZipFile" : "module.exports.handler = " + handler.toString()
    // And this call forms a valid JSON string with a function inside!
    function handler(event, context) {
        // comment
        console.log("Hello " + JSON.stringify(event, null, 4));
    }
    
    // Let's just make everything else as close to JSON as possible, 
    // But you can always in-line JavaScript or call other nodejs functions 
    return {
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "Creates lambda event handler triggered by cloudwatch event timer",
    "Resources": {

        // Lambda's execution role
        "ExecutionRole": {
            "Type": "AWS::IAM::Role",
            "DeletionPolicy": "Delete", // Sometimes, AWS cannot delete the a with attached policies, you can change to
                                        // "DeletionPolicy": "Retain", to workaround this issue
            "Properties": {
                "AssumeRolePolicyDocument": {
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Principal": {
                                "Service": "lambda.amazonaws.com"
                            },
                            "Action": "sts:AssumeRole"
                        }
                    ]
                },
                "Path": "/",
                "Policies": [
                    {
                        "PolicyName": "MyLambdaPolicy",
                        "PolicyDocument": {
                            "Statement": [
                                {
                                    "Resource": "*",
                                    "Action": [
                                        "cloudwatch:*",
                                        "logs:*"
                                    ],
                                    "Effect": "Allow"
                                },
                                {
                                    "Effect": "Allow",
                                    "Action": [
                                        "lambda:*"
                                    ],
                                    "Resource": [
                                        {"Fn::Join": ["", ["arn:aws:lambda:", {"Ref": "AWS::Region"}, ":", {"Ref": "AWS::AccountId"}, ":function:*"]]}
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        },

        // Lambda function resource
        "LambdaFunction": {
            "Type": "AWS::Lambda::Function",
            "DeletionPolicy": "Delete",
            "Properties": {
                "Code": {
                    "ZipFile" : "module.exports.handler = " + handler.toString() // <=== Here goes our handler body from above
                },
                "Description": "Just put some description here!",
                "FunctionName": lambdaName,
                "Handler": "index.handler",
                "MemorySize": 128,
                "Role": { "Fn::GetAtt": ["ExecutionRole", "Arn"]},
                "Runtime": "nodejs6.10",
                "Timeout": 120
            }
        },
        
        // An AWS scheduler rule
        "CloudwatchEventRule": {
            "Type": "AWS::Events::Rule",
            "Properties": {
                "Description": "ScheduledRule",
                "ScheduleExpression": "rate(1 minute)",
                "State": "ENABLED",
                "Targets": [{
                    "Arn": { "Fn::GetAtt": [ "LambdaFunction", "Arn" ] },
                    "Id": "TargetFunctionV1"
                }]
            }
        },

        // Special permission to allow CloudWatch Events to invoke lambda
        "PermissionForEventsToInvokeLambda": {
            "Type": "AWS::Lambda::Permission",
            "Properties": {
                "FunctionName": { "Ref": "LambdaFunction" },
                "Action": "lambda:InvokeFunction",
                "Principal": "events.amazonaws.com",
                "SourceArn": { "Fn::GetAtt": ["CloudwatchEventRule", "Arn"] }
            }
        }
    }
} // Cloudformation template ends here
} // Exported function ends here