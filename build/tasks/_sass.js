var gulp   = require('gulp'),
    common = require('gulp-common');

module.exports = function (config, plugins) {

  gulp.task('sass', function () {
    var stream = plugins.rubySass(config.sass.src + '/main.scss')
      .pipe(plugins.autoprefixer.apply(config.sass.prefix))

    if (common.isProd()) {
      stream = stream.pipe(
        plugins.minifyCss(config.sass.cssMinify)
      );
    }

    stream
      .pipe(gulp.dest(config.sass.dest))
      .pipe(plugins.livereload());
  });

  gulp.task('sass:watch', ['sass'], function () {
    gulp.watch(config.sass.src + '/**/*.scss', ['sass'])
  });
};
