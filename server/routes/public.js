var express = require('express');

module.exports = function (app, config) {

  app.use('/public', express.static(config.public.dest, {
    maxAge: config.public.expires
  }));
  
  app.use('/public', function (req, res, next) {
    res.status(404).end();
  });

};