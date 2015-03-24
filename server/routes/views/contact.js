'use strict';

const mailer = require('express-mailer');

module.exports = function (app, config) {
  mailer.extend(app, config.get('mailer'));

  app.get('/contact', function (req, res) {
    res.render('contact/index', {
      title : 'Contact'
    });
  });

  app.post('/contact', function (req, res) {

    // TODO: verify all required data exists
    // TODO: XSS preventions
    app.mailer.send('email', {
      to : 'jkutcher.me@gmail.com',
      subject : `New Contact Message from ${req.body.firstName}!`,
      details : {
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
        email     : req.body.email
      },
      message : req.body.message
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ msg : 'test error' });
      } else {
        res.json({ msg : 'success!' });
      }
    });
  });
};
