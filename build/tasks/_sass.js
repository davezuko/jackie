'use strict';
const gulp = require('gulp');
const sass = require('gulp-ruby-sass');

module.exports = function (common, config, plugins) {

  gulp.task('sass', function () {

    // TODO: use spread operator instead of .apply() when iojs supports it.
    var stream = sass(config.get('sass_entry'))
      .pipe(plugins.autoprefixer.apply(config.get('sass_prefix')))

    if (common.isProd()) {
      stream = stream.pipe(
        plugins.minifyCss(config.get('sass_minify'))
      );
    }

    stream
      .pipe(gulp.dest(config.get('sass_dest')))
      .pipe(plugins.livereload());
  });

  gulp.task('sass:watch', ['sass'], function () {
    gulp.watch(config.get('sass_src') + '/**/*.scss', ['sass'])
  });
};
