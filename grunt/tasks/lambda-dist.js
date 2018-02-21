module.exports = function(grunt) {
  grunt.registerTask('lambda-dist', [
      'lambda-build',
      'compress:MakeFunctionDistZip'
    ]);
};