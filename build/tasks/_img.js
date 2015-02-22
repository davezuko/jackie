var gulp   = require('gulp'),
    common = require('gulp-common');

module.exports = function (config, plugins) {
  gulp.task('img', function () {
    gulp.src(config.client.src + '/img/**/*')
      .pipe(gulp.dest(config.client.dest + '/img'));
  });

  gulp.task('img:watch', ['img'], function () {
    gulp.watch(config.client.src + '/img/**/*', ['img']);
  });
};