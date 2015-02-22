var gulp   = require('gulp'),
    common = require('gulp-common');

module.exports = function (config, plugins) {

  gulp.task('client', ['app', 'sass', 'img']);
  
  gulp.task('client:watch', ['app:watch', 'sass:watch', 'img:watch'], function () {
    plugins.livereload.listen(config.client.reload);
  });

};