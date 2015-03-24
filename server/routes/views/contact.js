'use strict';
const mailer = require('express-mailer');
const validateContact = require(
  '../../../client/app/isomorphic/contact-validation'
);

module.exports = function (app, config) {
  mailer.extend(app, config.get('mailer'));

  app.get('/contact', function (req, res) {
    res.render('contact/index', {
      title : 'Contact'
    });
  });

  app.post('/contact', function (req, res) {
    const data   = req.body;
    const errors = validateContact(data);

    if (errors.length) {
      return res.status(400).json({
        message : 'Contact submission validation failed.',
        errors  : errors
      });
    }

    // TODO: do we need to handle timeouts?
    app.mailer.send('email', {
      to : 'jkutcher.me@gmail.com',
      subject : `New Contact Message from ${data.firstName}!`,
      data    : data,
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ message : 'Server submission error.' });
      } else {
        res.json({ message : 'Contact submission successful.' });
      }
    });
  });
};
