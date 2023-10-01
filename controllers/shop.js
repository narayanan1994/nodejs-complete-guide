const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products",
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then((product) => {
    if (product) {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    } else {
      res.redirect("/");
    }
  }).catch(err => {
    console.log(err);
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(products => {
      res.render("shop/cart", {
        pageTitle: "Your cart",
        path: "/cart",
        products: products,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId).then(product => {
    return req.user.addToCart(product)
  }).then(result => {
    // console.log(result);
    res.redirect("/cart");
  }).catch(err => {
    console.log(err);
  });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  req.user.deleteItemFromCart(productId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then((orders) => {
      // console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
