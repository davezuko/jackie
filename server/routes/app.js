module.exports = function (app, config) {

  // TODO: DRY-ify root routes.
  app.get('/', function (req, res) {
    res.render('index', {
      title: 'Home'
    });
  });

  app.get('/about', function (req, res) {
    res.render('about/index', {
      title: 'About'
    });
  });

  app.get('/contact', function (req, res) {
    res.render('contact/index', {
      title: 'Contact'
    });
  });


    app.get('/writing-samples', function (req, res) {
      res.render('writing-samples/index', {
        title: 'Writing Samples'
      });
    });


    app.get('/bsw-curriculum', function (req, res) {
      res.render('bsw-curriculum/index', {
        title: 'Contact'
      });
    });


    app.get('/goals', function (req, res) {
      res.render('goals/index', {
        title: 'Goals'
      });
    });

};
