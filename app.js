const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const app = express();

// // in order to set express-handlebars as view engine
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts", // this will be taken by default but we are mentioning here explicit
    defaultLayout: "main-layout",
    extname: "hbs", // we have to give this extension here explicitly, otherwise it will look for .handlebars
  })
);
app.set("view engine", "hbs"); // the name engine name that we set should be file extentions of our html's like .hbs
// views folder will be taken default, because
// in order to set views with the folder containing html's
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRouter);

/* not working */
// // explicit middleware to handle /favicon.ico request from chrome/mozilla/edge browsers by default
// app.get('/favicon.ico', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'node-icon.ico'));
// });

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000); // does both createServer and listen
