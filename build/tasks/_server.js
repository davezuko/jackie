'use strict';
const gulp = require('gulp');

module.exports = function (common, config, plugins) {
  let app = require(config.get('server_base'));
  let server;

  gulp.task('server', function () {
    server = app.start();
  });

  gulp.task('server:watch', function () {
    plugins.nodemon(config.get('server_nodemon'));
  });
};
