require('babelify/polyfill');

// initialze primary navigation
require('./lib/responsive-nav')('.primary-nav');
require('./lib/affix')('.primary-nav', '.view-container');
