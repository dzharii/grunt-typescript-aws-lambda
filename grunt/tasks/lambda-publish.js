module.exports = function(grunt) {
  grunt.registerTask('lambda-publish', [
      'lambda-dist',
      'exec:AwsUpdateLambdaFunction'
    ]);
};