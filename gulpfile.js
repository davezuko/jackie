'use strict';

const common = require('gulp-common/es5.js');

common.loadTasks({
  tasks  : common.path(__dirname, 'build/tasks'),
  inject : [
    common,
    require('./build/config'),
    require('gulp-load-plugins')({
      scope: ['devDependencies']
    })
  ]
});
