const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const productsDataPath = path.join(rootDir, "data", "products.json");
const Cart = require("./cart");

const getProductsFromFile = (callback) => {
  fs.readFile(productsDataPath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(product => product.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(productsDataPath, JSON.stringify(updatedProducts, null, '\t'), (err) => {
          console.log("edit product err:", err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(productsDataPath, JSON.stringify(products, null, '\t'), (err) => {
          console.log("add product err:", err);
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(productId, callback) {
    getProductsFromFile((products) => {
      const product = products.find(product => product.id === productId);
      callback(product);
    })
  }

  static deleteById(productId) {
    getProductsFromFile((products) => {
      const product = products.find(product => product.id === productId);
      const updatedProducts = products.filter(product => product.id !== productId);
      fs.writeFile(productsDataPath, JSON.stringify(updatedProducts, null, '\t'), (err) => {
        if (err) {
          console.log("delete product err:", err);
        } else {
          Cart.deleteProduct(productId, product.price);
        }
      });
    });
  }
};
