module.exports = function(grunt) {
  grunt.registerTask('cfn-create', ['cfn-generate', 'exec:AwsCreateLambdaCfnTemplate', 'exec:AwsWaitCreateLambdaCfnTemplate']);
};
