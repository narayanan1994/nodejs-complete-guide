const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/product-form", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCss: true,
    productCss: true,
    editing: false,
    formAction: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/admin/products");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/product-form", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      formCss: true,
      productCss: true,
      editing: editMode,
      product: product,
      formAction: "/admin/edit-product"
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const product = new Product(productId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
  product.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin products",
      path: "/admin/products",
      productCss: true,
    });
  });
};
