'use strict';
const gulp = require('gulp');

module.exports = function (common, config, plugins) {

  gulp.task('server', function () {
    let app = require(config.get('server_base'));
    app.start();
  });

  gulp.task('server:watch', function () {
    plugins.nodemon(config.get('server_nodemon'));
  });
};
