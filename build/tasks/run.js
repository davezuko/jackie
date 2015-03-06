'use strict';
const gulp = require('gulp');

module.exports = function defaultTask (common, config, plugins) {

  gulp.task('build', ['client'], function () {
    // done...
  });

  // Need to make sure favicon has been moved to dist before running server
  gulp.task('dev', ['img'], function () {
    gulp.start('client:watch', 'server:watch');
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
