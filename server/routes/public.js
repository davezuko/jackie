'use strict';
const path    = require('path');
const express = require('express');

module.exports = function (app, config) {
  app.use(express.static(path.resolve(__dirname + '../../public'), {
    // maxAge : config.get('client_expires')
  }));
};
