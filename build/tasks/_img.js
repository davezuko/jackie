'use strict';
const gulp = require('gulp');

// TODO: image paths should be defined in config
// TODO: watch should pass stream into img handler function, rather than
// re-globbing the entire image folder by re-running img task.
module.exports = function (common, config, plugins) {

  gulp.task('img', function () {
    gulp.src(config.get('client_src') + '/img/**/*')
      .pipe(gulp.dest(config.get('client_dest') + '/img'));
  });

  gulp.task('img:watch', ['img'], function () {
    gulp.watch(config.get('client_src') + '/img/**/*', ['img']);
  });
};
