var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};
/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user;
  let products = [
    {
      name: 'OnePlus 9 Pro ',
      category: 'Mobile',
      description: 'Technological marvel',
      image:
        'https://www.91-img.com/pictures/141189-v6-oneplus-9-pro-mobile-phone-medium-1.jpg?tr=q-80',
    },
    {
      name: 'realme GT 2 Pro 5G',
      category: 'Mobile',
      description: 'The power of GT',
      image:
        'https://www.91-img.com/pictures/147758-v7-realme-gt-2-pro-5g-mobile-phone-medium-1.jpg?tr=q-80',
    },
    {
      name: 'OnePlus 10T ',
      category: 'Mobile',
      description: 'The Oneplus Power',
      image:
        'https://www.91-img.com/pictures/148092-v4-oneplus-10t-mobile-phone-medium-1.jpg?tr=q-80',
    },
    {
      name: 'Apple iPhone 12 ',
      category: 'Mobile',
      description: 'The Apple legacy',
      image:
        'https://www.91-img.com/pictures/136139-v4-apple-iphone-12-mobile-phone-medium-1.jpg?tr=q-80',
    },
  ];
  res.render('index', { products, user });
});

router.get('/login', (req, res) => {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('user/login', { loginErr: req.session.loginErr });
    req.session.loginErr = false;
  }
});

router.get('/signup', (req, res) => {
  res.render('user/signup');
});

router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
    res.redirect('/login');
  });
});

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
    } else {
      req.session.loginErr = 'Invalid username or password';
      res.redirect('/login');
    }
  });
});
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;
