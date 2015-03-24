require('babelify/polyfill');

// initialze primary navigation
require('./lib/affix')('.navigation', '.view-container');
require('./components/navigation')('.navigation');

// initialize contact form
require('./components/contact')('.contact-form');
