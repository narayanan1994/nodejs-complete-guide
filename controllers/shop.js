const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll().then((rows) => {
    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "All products",
      path: "/products",
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  // Product.findAll({where: {id: productId}}).then((rows) => {
  //   console.log(rows[0]);
  // }).catch(err => {
  //   console.log(err);
  // });
  Product.findByPk(productId).then((product) => {
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
  Product.findAll().then((rows) => {
    res.render("shop/index", {
      prods: rows,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      // console.log(cart);
      return cart.getProducts();
    })
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
  /*
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
  */
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      // console.log(cart);
      fetchedCart = cart;
      return cart.getProducts({where: {id: productId}});
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product
      }
      return Product.findByPk(productId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    })
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
  // Product.findById(productId, (product) => {
  //   Cart.addProduct(productId, product.price, () => {
  //     res.redirect("/cart");
  //   });
  // });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      // console.log(cart);
      fetchedCart = cart;
      return cart.getProducts({where: {id: productId}});
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
  // Product.findById(productId, (product) => {
  //   Cart.deleteProduct(productId, product.price);
  //   res.redirect("/cart");
  // });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  let cartProducts;
  req.user.getCart()
    .then((cart) => {
      // console.log(cart);
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      // console.log(products);
      cartProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      // console.log(order);
      return order.addProducts(
        cartProducts.map((product) => {
          // here on creating an order, we add each cart products quantity to 'orderItem' model
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        })
      );
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getOrders = (req, res, next) => {
  // here we do eager loading technique,'
  // we not only fetch the order details of the user
  // but also include the products of each order
  // originally we associate Order with Product, and table def of Product is product and we pluralize it to products
  req.user.getOrders({ include: ["products"] })
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
