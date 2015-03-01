'use strict';

const express = require('express');

module.exports = function (app, config) {

  app.use('/client', express.static(config.get('client_dest'), {
    maxAge : config.get('client_expires')
  }));

  app.use('/client', function (req, res) {
    res.status(404).end();
  });

};
