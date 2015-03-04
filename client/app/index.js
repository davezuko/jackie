require('babelify/polyfill');

// initialze primary navigation
require('./lib/response-nav')('.primary-nav');
require('./lib/affix')('.primary-nav', '.view-container');
