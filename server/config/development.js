var path = require('path'),
    env  = process.env.NODE_ENV; // this is set (or defaulted) in ../config.js

module.exports = function (base) {
  var buildConfig = require(base + '/build/config');

  var config = {
    env  : env,
    port : 3000,
    gzip : {
      enabled   : true,
      threshold : 200   // kb (kilobytes)
    },
    proxy : {
      trust : true // trust x-forwarded-* headers
    },
    client : {
      dest    : path.resolve(base, buildConfig.client.dest),
      expires : 86400000 * 7 // 1 week
    },
    public : {
      dest    : path.resolve(buildConfig.server.base, 'public'),
      expires : 86400000 * 7 // 1 week
    }
  };

  return config;
}