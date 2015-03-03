'use strict';

const PRIMARY_NAV = [
  'About', 'BSW Education', 'Career', 'Gallery', 'Contact'
];

function camelToSnake (str) {
  return str.split(' ').join('-').toLowerCase();
}

module.exports = function (app, config) {

  app.get('/', function (req, res) {
    res.render('index', {
      title: 'Home'
    });
  });

  PRIMARY_NAV.forEach(function (nav) {
    let snaked = camelToSnake(nav);

    app.get(`/${snaked}`, function (req, res) {
      res.render(`${snaked}/index`, {
        title  : nav
      });
    });
  });
};
