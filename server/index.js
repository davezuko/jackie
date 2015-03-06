'use strict';

// default configuration =================
const DEFAULT_PORT = 3000;

// module dependencies ===================
const fs          = require('fs');
const logger      = require('morgan');
const express     = require('express');
const favicon     = require('serve-favicon');
const bodyParser  = require('body-parser');
const compression = require('compression');

// ---------------------------------------
// Base App Configuration
// ---------------------------------------
const app    = express();
const config = require('./config');
let server;

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// ---------------------------------------
// Optional App Configuration
// ---------------------------------------
if (config.get('gzip_enabled')) {
  app.use(compression({
    threshold : config.get('gzip_threshold')
  }));
}

if (config.get('trust_proxy')) {
  app.enable('trust proxy');
}

// ---------------------------------------
// Cache-Busting Middleware
// ---------------------------------------
const bustHashes = require('../dist/client/css/busters.json');
const busters = Object.keys(bustHashes)
  .reduce(function (map, key) {
    if (key.indexOf('main.css') !== -1) {
      map.css = bustHashes[key];
    } else if (key.indexOf('app-bundle.js') !== -1) {
      map.js = bustHashes[key];
    }
    return map;
  }, {});

app.use(function(req, res, next){
  res.locals.busters = busters;
  next();
});

// ---------------------------------------
// Route Definitions
// ---------------------------------------
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

fs.readdirSync(__dirname + '/routes')
  .forEach(function (route) {
    require('./routes/' + route)(app, config);
  });

// ---------------------------------------
// Error Handling
// Note: Must be declared after routes.
// ---------------------------------------
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;

  console.log(err);
  res.status(status);
  res.end('Server Error: ' + status);
});

// ---------------------------------------
// Custom App Methods
// ---------------------------------------
app.setPort = function (override) {
  let port = isNaN(parseInt(override)) ?
    app.get('port') || DEFAULT_PORT : override;

  app.set('port', port);
}

app.start = function () {
  return server = app.listen(app.get('port'), function () {
    console.log(`
Server Started
========================
Env  : ${process.env.NODE_ENV}
Port : ${server.address().port}
------------------------
    `);
  });
};

// configure default port
app.setPort(config.get('port'));
module.exports = app;
