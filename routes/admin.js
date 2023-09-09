const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

// GET - /admin/add-product
router.get("/add-product", (req, res, next) => {
  // console.log('In the add-product middleware!');
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formCss: true,
    productCss: true
  });
});

// POST - /admin/add-product
router.post("/add-product", (req, res, next) => {
  // console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
