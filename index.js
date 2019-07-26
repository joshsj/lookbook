"use strict";

const express = require("express");
const Datastore = require("nedb");

const app = express();
app.use(express.static("./public")); // local site files
app.use(express.json()); // treat requests as JSON
app.listen(3000); // port for requests

const dbFits = new Datastore("./db/fits.db");
dbFits.loadDatabase();
const dbUsers = new Datastore("./db/users.db");
dbUsers.loadDatabase();

// request for user data
// query: username=
// response: user data
app.get("/api/user", (req, res) => {
  // get requested user
  dbUsers.findOne({ _id: req.query.username }, (err, data) => {
    if (data) {
      // remove fit ids from user to reduce size
      data.looks = data.looks.map(look => look.title);
      res.json(data);
    } else {
      res.end(404); // send 404, user not found
    }
  });
});
