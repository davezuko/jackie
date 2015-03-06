'use strict';

const express = require('express');
const staticAsset = require('static-asset');

module.exports = function (app, config) {
  app.use(staticAsset(config.get('client_dest')));
  app.use(express.static(config.get('client_dest'), {
    maxAge : config.get('client_expires')
  }));

  app.use('/client', function (req, res) {
    res.status(404).end();
  });
};
