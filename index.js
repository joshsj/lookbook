const express = require("express");
const datastore = require("nedb-promises"); // nedb with native promise wrapper
const hbs = require("express-handlebars");

// load databases

const dbUsers = datastore.create("./db/users.db");
const dbLooks = datastore.create("./db/looks.db");
const dbFits = datastore.create("./db/fits.db");

// configure express

const app = express();

// register handlebars as template engine
app.engine(
  "hbs", // engine name
  hbs({
    extname: ".hbs" // main aint typing .handlebars
  })
);
app.set(
  "view engine",
  "hbs" // engine name, also file extension
);

// host styles, scripts, etc.
app.use(express.static("./public"));

// configure routes
app.get("/", (req, res) => res.render("index"));

app.use("/user", require("./routes/user.js")(dbUsers));
app.use("/fit", require("./routes/fit.js")(dbUsers, dbFits));

// route handlers are ordered in configuration order
// use 404 as fallback
app.use((req, res) => res.status(404).render("404"));

// GO!
app.listen(80);
