var gulp   = require('gulp'),
    common = require('gulp-common');

module.exports = function (config, plugins) {
  var app = require(config.server.base),
      server;

  gulp.task('server', function () {
    server = app.start();
  });

  gulp.task('server:watch', function () {
    gulp.start('server');
    // plugins.nodemon(config.server.nodemon);
  });
};
