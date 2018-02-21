module.exports = function(grunt) {
  grunt.registerTask('cfn-generate', function() {
    const getTemplate = require(grunt.config.get('LambdaCfnTemplateGeneratorPath'));
    const fs = require('fs')
    const targetPath = grunt.config.get('LambdaCfnTemplatePath')

    let functionName = grunt.config.get('LambdaFunctionName');
    let jsonText = JSON.stringify(getTemplate(functionName), null, 4);

    fs.writeFileSync(targetPath, jsonText)
  });
};