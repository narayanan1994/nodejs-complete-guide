const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('In the / middleware!');
    // console.log('shop.js', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    const products = adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'}); // this automatically picks shop.pug, we dont have to specify file extension
});

module.exports = router;