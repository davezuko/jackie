'use strict';
const gulp = require('gulp');

module.exports = function defaultTask (common, config, plugins) {

  gulp.task('build', ['client'], function () {
    // done...
  });

  gulp.task('dev', ['client:watch', 'server:watch'], function () {
    // done...
  });

  gulp.task('deploy', ['build'], function () {
    gulp.start('server');
  });

  gulp.task('deploy:prod', function (callback) {
    process.env.NODE_ENV = config.get('env_prod');
    common.log(`Forced Node environment to: ${common.env()}`);
    gulp.start('build');
  });

};
