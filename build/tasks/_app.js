var gulp       = require('gulp'),
    common     = require('gulp-common'),
    source     = require('vinyl-source-stream'),
    watchify   = require('watchify'),
    browserify = require('browserify');

module.exports = function (config, plugins) {

  function getBundler () {
    return browserify(config.app.bundle);
  }

  gulp.task('app', ['app:lint'], function (callback) {
    bundle(getBundler(), callback);
  });

  gulp.task('app:lint', function () {
    lint(gulp.src(common.path(config.app.src, '**/*.js')));
  });

  gulp.task('app:watch', ['app:lint'], function () {
    var watcher = watchify(getBundler());

    bundle(watcher);
    watcher.on('update', function () {
      bundle(watcher);
      common.toArray(arguments).reduce(function (flattened, item) {
        return flattened.concat(item);
      }, []).map(gulp.src).map(lint);
    });
  });

  gulp.task('app:test', function () {
    // todo...
  });

  gulp.task('app:tdd', function () {
    // todo...
  });

  function bundle (bundler, callback) {
    var tracker = common.track();

    if (common.isProd()) {
      bundler.plugin('minifyify', {
        map    : config.app.map,
        output : common.path(config.app.dest, config.app.map)
      });
    }

    common.log('Bundle started.');
    bundler
      .bundle()
      .on('error', function (err) {
         common.log(err.message);
         this.emit('end');
      })
      .on('end', function () {
        common.log('Bundle finished after: ' + tracker() / 1000 + 's.');
        callback && callback();
      })
      .pipe(source(config.app.dist))
      .pipe(gulp.dest(config.app.dest))
      .pipe(plugins.livereload())
  }

  function lint (stream) {
    stream = stream
      .pipe(plugins.jshint(config.js.lint))
      .pipe(plugins.jshint.reporter('jshint-stylish'));

    if (common.isProd()) {
      stream.pipe(plugins.jshint.reporter('fail'));
    }
  }
};
