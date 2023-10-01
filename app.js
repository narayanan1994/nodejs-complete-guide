const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./utils/database").mongoConnect;

const app = express();

const User = require('./models/user');

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
  User.findById("6519bfc986e7ec53bf3684d1").then(user => {
      req.user = new User(user._id, user.name, user.email, user.cart);
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

mongoConnect(() => {
  app.listen(3000);
});
