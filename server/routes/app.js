module.exports = function (app, config) {

  var BASE_ROUTES = [
    'about',
    'experience',
    'writing-samples',
    'bsw-curriculum',
    'goals',
    'contact'
  ];

  app.get('/', function (req, res) {
    res.render('index', {
      title : 'Home'
    });
  });

  BASE_ROUTES.forEach(function (route) {
    app.get('/' + route, function (req, res) {
      var properCase = route
        .split('-')
        .map(function (n) {
          return n[0].toUpperCase() + n.slice(1);
        })
        .join(' ');

      res.render(route + '/index', {
        title   : properCase,
        heading : properCase
      });
    });
  });
};
