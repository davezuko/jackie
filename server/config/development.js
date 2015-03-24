'use strict';
const common = require('gulp-common/es5.js');
const path   = require('path');

module.exports = function (base) {
  const build = require(common.path(base, 'build', 'config'));
  let config  = new Map();

  // ----------------------------------
  // Environment
  // ----------------------------------
  config.set('env', 'development');
  config.set('port', 3000);

  // ----------------------------------
  // File Serving
  // ----------------------------------
  config.set('client_dest', path.resolve(build.get('client_dest')));
  config.set('client_expires', 86400000 * 7); // 1 week

  config.set('public_dest', path.resolve(build.get('server_base'), 'public'));
  config.set('public_expires', 86400000 * 7); // 1 week

  // ----------------------------------
  // Compressions
  // ----------------------------------
  config.set('gzip_enabled', true);
  config.set('gzip_threshold', 200);

  // ----------------------------------
  // Security
  // ----------------------------------
  config.set('trust_proxy', true); // trust x-forwarded-* headers

  // ----------------------------------
  // Mailer
  // ----------------------------------
  config.set('mailer', require('./mailer.ignore.js'));

  return config;
}
