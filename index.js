const express = require("express");
const datastore = require("nedb-promises"); // nedb with native promise wrapper

// load databases
const dbUsers = datastore.create("./db/users.db");
const dbLooks = datastore.create("./db/looks.db");
const dbFits = datastore.create("./db/fits.db");

const app = express();
app.listen(80);

// parse POST body as url encoded
// http://expressjs.com/en/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));

// host files
app.use(express.static("./public"));

// 404 handler
app.get("/404", (req, res) => res.status(404).redirect("/404.html"));

// configure routes
app.use("/user", require("./routes/user.js")(dbUsers));
