var common = require('gulp-common');

common.loadTasks({
  tasks : common.path(__dirname, 'build/tasks'),
  args  : [
    require('./build/config'),
    require('gulp-load-plugins')({
      scope: ['devDependencies']
    })
  ]
});
