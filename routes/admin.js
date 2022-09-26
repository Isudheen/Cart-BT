var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers');
const userHelper = require('../helpers/user-helpers');
const userControlHelper = require('../helpers/user-control-helpers');
const adminAccountHelper = require('../helpers/admin-account-helpers');
/* GET users listing. */
router.get('/', function (req, res, next) {
  let adminData = req.session.admin;
  if (!adminData) {
    res.render('admin/login', { admin: true });
  }
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
  res.render('admin/view-products', { admin: true, products });
});

router.get('/add-product', (req, res) => {
  res.render('admin/add-product');
});

router.post('/add-product', (req, res) => {
  productHelper.addProduct(req.body, (id) => {
    let image = req.files.image;
    image.mv(`./public/product-images/${id}.jpg`, (err, done) => {
      if (!err) {
        res.render('admin/add-product');
      } else console.log(err);
    });
  });
});

router.get('/view-users', (req, res) => {
  let adminData = req.session.admin;
  if (!adminData) {
    res.render('admin/login', { admin: true });
  }
  userControlHelper.getAllUsers().then((users) => {
    console.log(users);
    res.render('admin/view-users', { admin: true, users, adminData });
  });
});

router.get('/add-user', (req, res) => {
  res.render('admin/add-user');
});

router.post('/add-user', (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    console.log(response);
    res.redirect('/admin/view-users');
  });
});

router.get('/edit-user/:id', (req, res) => {
  let userId = req.params.id;
  userControlHelper.getUserDetails(userId).then((user) => {
    res.render('admin/edit-user', { user });
  });
});

router.post('/edit-user/:id', (req, res) => {
  let id = req.params.id;
  userControlHelper.updateUser(id, req.body).then(() => {
    res.redirect('/admin/view-users');
  });
});

router.get('/delete-user/:id', (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  userControlHelper.deleteUser(userId).then((response) => {
    res.redirect('/admin');
  });
});

router.post('/search-user', (req, res) => {
  let adminData = req.session.admin;
  let userName = req.body.Name;
  console.log(userName);
  userControlHelper.getUserByName(userName).then((user) => {
    console.log(user);
    res.render('admin/view-search', { admin: true, user, adminData });
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/admin');
  } else {
    res.render('admin/login', { admin: true, loginErr: req.session.loginErr });
    req.session.loginErr = false;
  }
});

router.get('/signup', (req, res) => {
  res.render('admin/signup', { admin: true });
});

router.post('/signup', (req, res) => {
  adminAccountHelper.adminSignup(req.body).then((response) => {
    console.log(response);
    res.redirect('/admin/login');
  });
});

router.post('/login', (req, res) => {
  adminAccountHelper.adminLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.admin = response.admin;
      console.log(req.session);
      res.redirect('/admin');
    } else {
      req.session.loginErr = 'Invalid username or password';
      res.redirect('/admin/login');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;
