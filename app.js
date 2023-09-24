const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require('./utils/database');

const app = express();

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.set("view engine", "ejs");
// views folder will be taken default, because
// in order to set views with the folder containing html's
app.set("views", "views");

const errorController = require('./controllers/error');
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    })
});

app.use("/admin", adminRouter);
app.use(shopRouter);

/* not working */
// // explicit middleware to handle /favicon.ico request from chrome/mozilla/edge browsers by default
// app.get('/favicon.ico', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'node-icon.ico'));
// });

app.use(errorController.get404);

/*
CREATE TABLE IF NOT EXISTS `products` (
    `id` INTEGER NOT NULL auto_increment , 
    `title` VARCHAR(255) NOT NULL, 
    `imageUrl` VARCHAR(255) NOT NULL, 
    `price` DOUBLE PRECISION NOT NULL, 
    `description` VARCHAR(255) NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    `userId` INTEGER, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) 
ENGINE=InnoDB;
*/
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
//   .sync({force: true})
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
        return User.create({name: 'Narayanan', email: 'test@test.com'});
    }
    return Promise.resolve(user);
  })
//   .then((user) => {
//     // console.log(user);
//     return user.createCart();
//   })
//   .then((cart) => {
//     console.log(cart);
//     app.listen(3000);
//   })
  .then((user) => {
    // console.log(user);
    app.listen(3000); // does both createServer and listen
  })
  .catch((err) => {
    console.log(err);
  });
