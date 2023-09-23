const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const productsDataPath = path.join(rootDir, "data", "products.json");

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
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(productsDataPath, JSON.stringify(products, null, '\t'), (err) => {
        console.log("writeFile err:", err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
