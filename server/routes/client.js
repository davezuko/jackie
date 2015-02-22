var express = require('express');

module.exports = function (app, config) {

  app.use('/client', express.static(config.client.dest, {
    maxAge: config.client.expires
  }));
  
  app.use('/client', function (req, res, next) {
    res.status(404).end();
  });

};