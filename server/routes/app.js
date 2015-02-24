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
      res.render(route + '/index', {
        title : route.split('-').map(function (name) {
          return name[0].toUpperCase() + name.slice(1);
        }).join(' ')
      });
    });
  });
};
