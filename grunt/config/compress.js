module.exports = {
    MakeFunctionDistZip: {
        options: {
            archive: '<%= LocalFunctionDistArchive %>'
        },
        files: [
            { expand: true, cwd: '<%= BuildDir %>', src: ['**'], dest: '' },
            { expand: true, cwd: '<%= SourceRoot %>/node_modules', src: ['**'], dest: 'node_modules' },
        ]
    }
};