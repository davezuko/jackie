'use strict';

// TODO: these could be dynamically pulled in from /views
const NAV_ITEMS = [
  'About',
  'BSW Education',
  'Career',
  'Gallery',
  'Contact'
].map(function (item) {
  return {
    name  : item,
    route : `/${item.toLowerCase().split(' ').join('-')}`
  };
});

module.exports = function (app, config) {

  // ----------------------------------
  // Navigation Middleware
  // ----------------------------------
  app.use(function (req, res, next) {
    res.locals.navigation = NAV_ITEMS;
    next();
  });

  // ----------------------------------
  // Core View Routes
  // ----------------------------------
  app.get('/', function (req, res) {
    res.render('index', {
      title: 'Home'
    });
  });

  NAV_ITEMS.forEach(function (item) {
    app.get(`${item.route}`, function (req, res) {
      res.render(`${item.route.slice(1)}/index`, {
        title  : item.name,
        active : item.name
      });
    });
  });
};
