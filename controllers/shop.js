const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, tableMetaData]) => {
    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "All products",
      path: "/products",
      productCss: true,
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then(([product]) => {
    if (product && product.length > 0) {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].title,
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
  Product.fetchAll().then(([rows, tableMetaData]) => {
    res.render("shop/index", {
      prods: rows,
      pageTitle: "Shop",
      path: "/",
      productCss: true,
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (cartProduct) => cartProduct.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price, () => {
      res.redirect("/cart");
    });
  });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
