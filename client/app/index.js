require('babelify/polyfill');

// initialze primary navigation
require('./lib/affix')('.primary-nav', '.view-container');
require('./components/navigation')('.primary-nav');

// initialize contact form
require('./components/contact')('.form--contact');
