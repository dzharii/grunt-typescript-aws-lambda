module.exports = function(grunt) {
  grunt.registerTask('cfn-update', ['cfn-generate', 'exec:AwsUpdateLambdaCfnTemplate']);
};
