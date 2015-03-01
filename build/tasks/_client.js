'use strict';
const gulp = require('gulp');

module.exports = function (common, config, plugins) {

  gulp.task('client', ['app', 'sass', 'img']);

  gulp.task('client:watch', ['app:watch', 'sass:watch', 'img:watch'], function () {
    plugins.livereload.listen(config.get('client_reload'));
  });

};
