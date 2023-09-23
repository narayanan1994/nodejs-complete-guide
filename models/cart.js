const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const cartDataPath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
    static addProduct(productId, productPrice, callback) {
        // Fetch the previous cart
        fs.readFile(cartDataPath, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === productId)
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: productId, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + (+productPrice);
            fs.writeFile(cartDataPath, JSON.stringify(cart, null, '\t'), (err) => {
                // console.log(err);
                callback();
            });
        });
    }

    static deleteProduct(productId, productPrice) {
        fs.readFile(cartDataPath, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(product => product.id === productId);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(product => product.id !== productId);
            updatedCart.totalPrice = updatedCart.totalPrice - (productQty * productPrice);
            fs.writeFile(cartDataPath, JSON.stringify(updatedCart, null, '\t'), (error) => {
                if (error) {
                    console.log("Cart -> deleteProduct() -> writeFile()");
                    console.log(error);
                }
            });
        });
    }

    static getCart(callback) {
        fs.readFile(cartDataPath, (err, fileContent) => {
            if (err) {
                callback(null);
            } else {
                const cart = JSON.parse(fileContent);
                callback(cart);
            }
        });
    }
}