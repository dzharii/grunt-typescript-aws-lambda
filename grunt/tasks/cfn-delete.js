module.exports = function(grunt) {
  grunt.registerTask('cfn-delete', ['exec:AwsDeleteLambdaCfnTemplate']);
};
