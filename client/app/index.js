require('babelify/polyfill');
const affix      = require('./lib/affix');
const contact    = require('./components/contact');
const navigation = require('./components/navigation');

// initialze primary navigation
affix('.navigation', '.view-container');
navigation('.navigation');

// initialize contact form
if (document.querySelector('.contact-form')) {
  contact();
}

// analytics
require('./lib/analytics');
