'use strict';
const path = require('path');
const fs = require('fs');
const getConfig = require('./Gruntconfig.js');


module.exports = function(grunt) {

  let config = getConfig(grunt);

  require('load-grunt-config')(grunt, {
    configPath: path.join(__dirname, 'grunt/config'),
    jitGrunt: {
      customTasksDir: 'grunt/tasks'
    },
    data: config
  });
};