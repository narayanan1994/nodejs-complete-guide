const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product", // we establish a reference relation to Product model we have
          required: true,
        },
        quantity: {
          type: Schema.Types.Number,
          required: true,
        }
      }
    ]
  }
});

// these are called instance methods
userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  let updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  }
  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeItemFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  return this.save();
}

userSchema.methods.clearCart = function() {
  const updatedCart = { items: [] };
  this.cart = updatedCart;
  return this.save();
}

module.exports = mongoose.model("User", userSchema);

/*
const ObjectId = require("mongodb").ObjectId;
const getDB = require("../utils/database").getDB;

class User {
  constructor(_id, name, email, cart) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.cart = cart; // {items: []}
  }

  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    let updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    }
    const updatedCart = { items: updatedCartItems };
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDB();
    const productIds = this.cart.items.map((item) => item.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((cartProduct) => {
          return {
            ...cartProduct,
            quantity: this.cart.items.find((item) => {
              return item.productId.toString() === cartProduct._id.toString();
            }).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    const updatedCart = { items: updatedCartItems };
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  addOrder() {
    const db = getDB();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
            email: this.email,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart.item = [];
        const updatedCart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: updatedCart } }
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getOrders() {
    const db = getDB();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
*/
