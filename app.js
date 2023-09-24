const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// const db = require('./utils/database');

const app = express();

app.set("view engine", "ejs");
// views folder will be taken default, because
// in order to set views with the folder containing html's
app.set("views", "views");

const errorController = require('./controllers/error');
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log("table metadata");
//     console.log(result[1]);
//     console.log("table data");
//     console.log(result[0]);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(shopRouter);

/* not working */
// // explicit middleware to handle /favicon.ico request from chrome/mozilla/edge browsers by default
// app.get('/favicon.ico', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'node-icon.ico'));
// });

app.use(errorController.get404);

app.listen(3000); // does both createServer and listen
