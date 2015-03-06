'use strict';
const gulp       = require('gulp');
const source     = require('vinyl-source-stream');
const watchify   = require('watchify');
const browserify = require('browserify');

module.exports = function (common, config, plugins) {

  function getBundler () {
    return browserify(config.get('app_bundle'));
  }

  gulp.task('app', ['app:lint'], function (callback) {
    bundle(getBundler(), callback);
  });

  gulp.task('app:lint', function () {
    lint(gulp.src(common.path(config.get('app_src'), '**/*.js')));
  });

  gulp.task('app:watch', ['app:lint'], function () {
    let watcher = watchify(getBundler());

    bundle(watcher);
    watcher.on('update', function () {
      bundle(watcher);
      [].slice.apply(arguments).reduce(function (flattened, item) {
        return flattened.concat(item);
      }, []).map(gulp.src).forEach(lint);
    });
  });

  gulp.task('app:test', function () {
    // todo...
  });

  gulp.task('app:tdd', function () {
    // todo...
  });

  function bundle (bundler, callback) {
    let tracker = common.track();

    if (common.isProd()) {
      bundler.plugin('minifyify', {
        map    : false,
        output : common.path(config.get('app_dest'), config.get('app_dist'))
      });
    }

    common.log('Bundle started.');
    bundler
      .bundle()
      .on('error', function (err) {
         common.log(err.message);
         this.emit('end');
      })
      .on('end', function (file) {
        common.log(`Bundle finished after ${tracker()} ms.`);
        console.log(arguments);
        callback && callback();
      })
      .pipe(source(config.get('app_dist')))
      .pipe(gulp.dest(config.get('app_dest')))
      .pipe(plugins.livereload())
  }

  function lint (stream) {
    stream = stream
      .pipe(plugins.jshint(config.get('jshint')))
      .pipe(plugins.jshint.reporter('jshint-stylish'));

    if (common.isProd()) {
      stream.pipe(plugins.jshint.reporter('fail'));
    }
  }
};
