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
      message : req.body.message
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ msg : 'test error' });
      } else {
        res.json({ msg : 'success!' });
      }
    });

    console.log(req.body);
    // app.mailer.send('email', {
    //   to: 'jkutcher.me@gmail.com',
    //   subject: 'Test Email',
    // }, function (err) {
    //   if (err) {
    //     // handle error
    //     console.log(err);
    //     res.send('There was an error sending the email');
    //     return;
    //   }
    //   res.send('Email Sent');
    // });
  });
};
