const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  // this automatically picks shop.pug/shop.hbs/shop.ejs file from views folder, we dont have to specify file extension
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCss: true,
    layout: false // for handlebar, the render() takes this value as layout:true by default, we can overwrite it with setting false
  });
});

module.exports = router;
