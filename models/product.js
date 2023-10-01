const ObjectId = require("mongodb").ObjectId;
const getDB = require("../utils/database").getDB;

class Product {
  constructor(_id, title, imageUrl, price, description, userId) {
    this._id = _id ? new ObjectId(_id) : null;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.userId = userId;
  }

  save() {
    const db = getDB();
    let dbOperation;
    if (this._id) {
      // update the product
      dbOperation = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection("products").insertOne(this);
    }
    return dbOperation
      .then((result) => {
        // console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDB();
    // find() generally returns cursor
    // in find() we could use conditions also
    // to get the finite number of result we use toArray() method
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        // console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(productId) {
    const db = getDB();
    // here next() returns the last doc found
    return db
      .collection("products")
      .find({ _id: new ObjectId(productId) })
      .next()
      .then((product) => {
        // console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(productId) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) })
      .then((result) => {
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
