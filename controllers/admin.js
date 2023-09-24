const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/product-form", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    formAction: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // Product.create({
  //   title: title,
  //   imageUrl: imageUrl,
  //   price: price,
  //   description: description
  // }).then((result) => {
  //   // console.log(result);
  //   res.redirect("/admin/products");
  // }).catch(err => {
  //   console.log(err);
  // });
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  }).then((result) => {
    // console.log(result);
    res.redirect("/admin/products");
  }).catch(err => {
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  req.user.getProducts({where: {id: productId}}).then((products) => {
    if (!products || products.length < 1) {
      return res.redirect("/");
    }
    res.render("admin/product-form", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: products[0],
      formAction: "/admin/edit-product"
    });
  }).catch(err => {
    console.log(err);
  });
  // Product.findByPk(productId).then((product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  //   res.render("admin/product-form", {
  //     pageTitle: "Edit Product",
  //     path: "/admin/edit-product",
  //     editing: editMode,
  //     product: product,
  //     formAction: "/admin/edit-product"
  //   });
  // }).catch(err => {
  //   console.log(err);
  // });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(productId).then((product) => {
    if (!product) {
      return Promise.resolve(null);
    }
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.price = updatedPrice;
    product.description = updatedDescription;
    return product.save();
  }).then(result => {
    // console.log(result);
    res.redirect("/admin/products");
  }).catch(err => {
    console.log(err);
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId).then(product => {
    if (!product) {
      return Promise.resolve(null);
    }
    return product.destroy();
  }).then(result => {
    // console.log(result);
    res.redirect("/admin/products");
  }).catch(err => {
    console.log(err);
  });
  // Product.destroy({where: {id: productId}}).then(result => {
  //   // console.log(result);
  //   res.redirect("/admin/products");
  // }).catch(err => {
  //   console.log(err);
  // });
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then((rows) => {
    res.render("admin/products", {
      prods: rows,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  }).catch(err => {
    console.log(err);
  });
  // Product.findAll().then((rows) => {
  //   res.render("admin/products", {
  //     prods: rows,
  //     pageTitle: "Admin products",
  //     path: "/admin/products",
  //   });
  // }).catch(err => {
  //   console.log(err);
  // });
};
