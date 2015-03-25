'use strict';

// TODO: these could be dynamically pulled in from /views
const NAV_ITEMS = [
  'BSW',
  'Resume',
  'Goals',
  'Reflection',
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

    const base_href = req.url.split('/');
    res.locals.active = base_href.length > 0 ?
      base_href[1].toLowerCase() : 'home';

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

  app.get('/bsw', function (req, res) {
    res.render('bsw/index', {
      title : 'Bachelor\'s of Social Work'
    });
  });

  app.get('/resume', function (req, res) {
    res.render('resume/index', {
      title : 'Resume'
    });
  });

  app.get('/goals', function (req, res) {
    res.render('goals/index', {
      title : 'Goals'
    });
  });

  app.get('/reflection', function (req, res) {
    res.render('reflection/index', {
      title : 'Reflection'
    });
  });

  app.get('/gallery', function (req, res) {
    res.render('gallery/index', {
      title : 'Gallery'
    });
  });

  require('./views/contact')(app, config);
};
