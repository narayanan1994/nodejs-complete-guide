const express = require("express");

const adminData = require("./admin");

const router = express.Router();

// GET - /
router.get("/", (req, res, next) => {
  const products = adminData.products;
  // this automatically picks shop.pug/shop.hbs/shop.ejs file from views folder, we dont have to specify file extension
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    productCss: true
  });
});

module.exports = router;
