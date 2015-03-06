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

app.use(favicon(`${config.get('client_dest')}/img/favicon.ico`));
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
// Route Definitions
// ---------------------------------------
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

require('./routes/client')(app, config);
require('./routes/views')(app, config);
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
  return app;
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
