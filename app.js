const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
  User.findById("651aacac81e738a145eb7a2e").then(user => {
      req.user = user; // here user is full mongoose object
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

const username = encodeURIComponent("narayanan");
const password = encodeURIComponent("mongodb2023");
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.7huboie.mongodb.net/shop?retryWrites=true`).then(result => {
  // console.log(result);
  User.findOne().then(user => {
    if (!user) {
        const user = new User({
          name: "narayanan",
          email: "nanu.s94@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
    }
  })
  app.listen(3000);
}).catch(err => {
  console.log(err);
});
