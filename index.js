const express = require("express");
const datastore = require("nedb-promises"); // nedb with native promise wrapper

// load databases
const dbUsers = datastore.create("./db/users.db");
const dbLooks = datastore.create("./db/looks.db");
const dbFits = datastore.create("./db/fits.db");

const app = express();
app.listen(3000); // port

// parse POST body as url encoded
// http://expressjs.com/en/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));

// host public files
app.use(express.static("./public"));

// user search
app.get("/user", async (req, res) => {
  if (!req.query.username) {
    // no username, go home
    res.redirect("/");
  }

  // check user exists
  const exists = !!(await dbUsers.count({ username: req.query.username }));

  if (!exists) {
    // no such user, go home with alert
    res.redirect("/?not-found=");
  }

  // user exists, proceed to page
  res.redirect("/user.html");
});
