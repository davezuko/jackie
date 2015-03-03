'use strict';
const _slice = [].slice;

// --------------------------
// Path Helpers
// --------------------------
const PATH_LIB  = require('path');
const PATH_JOIN = exports.PATH_JOIN = '/';

// TODO: use spread operator once iojs supports it by default.
function path () {
  return PATH_LIB.normalize(
    PATH_LIB.resolve(_slice.apply(arguments).join(PATH_JOIN))
  );
}

// --------------------------
// Begin Config Definition
// --------------------------
let config = new Map();

// --------------------------
// Environment
// --------------------------
config.set('base', PATH_LIB.normalize(
  PATH_LIB.resolve(__dirname + PATH_JOIN + '..' + PATH_JOIN))
);
config.set('env_dev', 'development');
config.set('env_prod', 'production');

// --------------------------
// Static Client Files
// --------------------------
config.set('client_base',   path(config.get('base'), 'client'));
config.set('client_src',    path(config.get('client_base')));
config.set('client_dest',   path(config.get('base'), 'dist', 'client'));
config.set('client_reload', undefined); // livereload port

// --------------------------
// Client Application
// --------------------------
config.set('app_entry', 'index.js');
config.set('app_dist',  'app-bundle.js');
config.set('app_map',   config.get('app_dist').replace('.js', '.map.json'));
config.set('app_src',   path(config.get('client_src'), 'app'));
config.set('app_dest',  path(config.get('client_dest'), 'app'));
config.set('app_bundle', {
  cache        : {},
  debug        : true,
  entries      : path(config.get('app_src'), config.get('app_entry')),
  fullPaths    : true,
  transform    : ['babelify'],
  packageCache : {}
});

// --------------------------
// Server
// --------------------------
config.set('server_base', path(config.get('base'), 'server'));
config.set('server_scripts', path(config.get('server_base'), 'scripts'));
config.set('server_nodemon', {
  script : path(config.get('server_scripts'), 'start.js'),
  ext    : 'js',
  env    : { 'NODE_ENV' : 'development' },
  ignore : [
    'build',
    'client',
    'dist',
    'node_modules',
    '.sass-cache'
  ]
});

// --------------------------
// Sass
// --------------------------
config.set('sass_src',    path(config.get('client_src'), 'sass'));
config.set('sass_entry',  path(config.get('sass_src'), 'main.scss'));
config.set('sass_dest',   path(config.get('client_dest'), 'css'));
config.set('sass_prefix', ['last 2 versions', '> 2%']);
config.set('sass_minify', {
  keepSpecialComments : 0
});

// --------------------------
// Code Quality (JSHint)
// --------------------------
config.set('js_globals', {
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
});
config.set('jshint', {
  'bitwise'   : false,
  'camelcase' : true,
  'curly'     : false,
  'eqeqeq'    : true,
  'esnext'    : true,
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
  'globals'   : config.get('js_globals')
});

// --------------------------
// Module Exports
// --------------------------
module.exports = exports = config;
