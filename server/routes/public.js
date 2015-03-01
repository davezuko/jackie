'use strict';

const express = require('express');

module.exports = function (app, config) {

  app.use('/public', express.static(config.get('public_dest'), {
    maxAge: config.get('public_expires')
  }));

  app.use('/public', function (req, res) {
    res.status(404).end();
  });

};
