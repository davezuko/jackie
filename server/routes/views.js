'use strict';

// TODO: these could be dynamically pulled in from /views
const NAV_ITEMS = [
  'About',
  'BSW Education',
  'Goals',
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

  app.get('/about', function (req, res) {
    res.render('about/index', {
      title : 'About'
    });
  });

  app.get('/bsw-education', function (req, res) {
    res.render('bsw-education/index', {
      title : 'BSW Education'
    });
  });

  app.get('/goals', function (req, res) {
    res.render('goals/index', {
      title : 'Goals'
    });
  });

  app.get('/gallery', function (req, res) {
    res.render('gallery/index', {
      title : 'Gallery'
    });
  });


  app.get('/contact', function (req, res) {
    res.render('contact/index', {
      title : 'Contact'
    });
  });

  // ----------------------------------
  // Career Page
  // ----------------------------------
  app.get('/career', function (req, res) {
    res.locals.careerItems = [
      {
        date   : 'Nov. 25, 2014',
        labels : [
          { heading : 'Test Label' }
        ],
        heading : 'Became official with this amazing guy named David.',
        copy : [
          `This is a bunch of test copy. Each item in the collection will be displayed as a paragraph! I\'m really not sure what else to put in here but really don't want to use more lorem ipsum. I could use Bacon Ipsum but that still isn't too exciting... it's much easier to just sit here and ramble in retrospect of everything.`,
          `Notice how this is a different paragraph! How amazing. This is even more test copy because I need to see how this looks with actual copy. Just writing more and more, hopefully this ends soon.`
        ]
      },
      {
        date   : 'Jan. 28, 2015',
        labels : [
          { heading : 'Test Label' },
          { heading : 'Test Label' }
        ],
        heading : 'Had an incredible birthday!',
        copy : [
          `This is a bunch of test copy. Each item in the collection will be displayed as a paragraph! I\'m really not sure what else to put in here but really don't want to use more lorem ipsum. I could use Bacon Ipsum but that still isn't too exciting... it's much easier to just sit here and ramble in retrospect of everything.`,
          `Notice how this is a different paragraph! How amazing. This is even more test copy because I need to see how this looks with actual copy. Just writing more and more, hopefully this ends soon.`
        ]
      },
      {
        date   : 'Apr. 5, 2015',
        labels : [
          { heading : 'Test Label' }
        ],
        heading : 'On a cruise, vacation time!',
        copy : [
          `This is a bunch of test copy. Each item in the collection will be displayed as a paragraph! I\'m really not sure what else to put in here but really don't want to use more lorem ipsum. I could use Bacon Ipsum but that still isn't too exciting... it's much easier to just sit here and ramble in retrospect of everything.`,
          `Notice how this is a different paragraph! How amazing. This is even more test copy because I need to see how this looks with actual copy. Just writing more and more, hopefully this ends soon.`
        ]
      }
    ];

    res.render('career/index', {
      title : 'Career'
    });
  });
};
