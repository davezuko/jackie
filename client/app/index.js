// Temporary polyfill until I fix functional-js...
// Babel assumes Array.from exists.
require('./polyfills/array-from');

// initialze primary navigation affixer
require('./lib/affix')('.primary-nav');
