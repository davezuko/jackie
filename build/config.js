module.exports = exports = {};

// --------------------------
// Path Helpers
// --------------------------
var pathLib = require('path'),
    _slice  = [].slice;

function path () {
  return pathLib.normalize(pathLib.resolve(
    _slice.apply(arguments).join(PATH_JOIN)
  ));
}

// --------------------------
// Common Paths
// --------------------------
var BASE      = exports.BASE      = path(__dirname + '/../');
var PATH_JOIN = exports.PATH_JOIN = '/';

// environment constants
exports.env = {};
exports.env.DEV = exports.env.DEVELOPMENT = 'development';
exports.env.PROD = exports.env.PRODUCTION = 'production';

// static client files
exports.client        = {};
exports.client.base   = path(exports.BASE, 'client');
exports.client.src    = exports.client.base;
exports.client.dest   = path(exports.BASE, 'dist');
exports.client.reload = undefined; // livereload port

// --------------------------
// Client Application
// --------------------------
exports.app        = {};
exports.app.entry  = 'index.js';
exports.app.dist   = 'app-bundle.js';
exports.app.map    = exports.app.dist.replace('.js', '.map.json');
exports.app.src    = path(exports.client.src, 'app');
exports.app.dest   = path(exports.client.dest, 'app');
exports.app.bundle = {
  cache        : {},
  debug        : true,
  entries      : path(exports.app.src, exports.app.entry),
  fullPaths    : true,
  transform    : ['babelify'],
  packageCache : {}
};

// --------------------------
// Server
// --------------------------
exports.server         = {};
exports.server.base    = path(exports.BASE, 'server');
exports.server.nodemon = {
  script : path(exports.server.base, 'start.js'),
  ext    : 'js',
  env    : { 'NODE_ENV' : 'development' },
  ignore : [
    path(exports.client.base, '**'),
    path(BASE, 'build', '**')
  ]
};

// --------------------------
// Sass
// --------------------------
exports.sass = {
  src       : path(exports.client.src, 'sass'),
  dest      : path(exports.client.dest, 'css'),
  prefix    : ['last 2 versions', '> 2%'],
  cssMinify : {
    keepSpecialComments : 0
  }
};

// --------------------------
// Code Quality (JS)
// --------------------------
exports.js = {};
exports.js.globals = {
  'console'     : true,
  'alert'       : false,
  'document'    : false,
  'window'      : false,
  'setInterval' : false,
  'setTimeout'  : false,
  'Image'       : false,
  'require'     : false,
  'exports'     : true,
  'module'      : true
};
exports.js.lint = {
  'bitwise'   : false,
  'camelcase' : true,
  'curly'     : false,
  'eqeqeq'    : true,
  'forin'     : false,
  'immed'     : true,
  'indent'    : 2,
  'latedef'   : false,
  'noarg'     : true,
  'noempty'   : true,
  'nonew'     : false,
  'plusplus'  : false,
  'quotmark'  : 'single',
  'undef'     : true,
  'unused'    : false,
  'strict'    : false,
  'maxparams' : false,
  'maxdepth'  : false,
  'maxlen'    : 80,
  'esnext'    : true,
  'globals'   : exports.js.globals
};

// --------------------------
// Karma Testing
// --------------------------
exports.karma = {
  basePath : process.cwd(),

  port      : 8000,
  colors    : true,
  autoWatch : true,
  logLevel  : 'INFO',

  files : [
    path(exports.client.dest, exports.app.dist)
      .replace(exports.BASE + exports.PATH_JOIN, '')
  ],
  exclude : [],

  browsers : ['PhantomJS'],
  plugins  : [
    'karma-mocha',
    'karma-phantomjs-launcher',
    'karma-chai',
    'karma-sinon-chai',
    'karma-mocha-reporter'
  ],
  frameworks : ['mocha', 'chai', 'sinon-chai'],
  reporters  : ['mocha'],
};
