
// initialze primary navigation
(noHeader => require('./lib/nav-lock')('.primary-nav', {
  locked : noHeader ? false : false,
  toggle : noHeader ? false : true
}))(!document.getElementsByTagName('header').length);
