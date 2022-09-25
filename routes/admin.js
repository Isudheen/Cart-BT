var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');

/* GET users listing. */
router.get('/', function (req, res, next) {
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

module.exports = router;
