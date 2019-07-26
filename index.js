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

// request for user's looks
// query: username
// response: looks data
app.get("/api/looks", (req, res) => {
  // find user, only get looks
  dbUsers.findOne(
    { _id: req.query.username }, // requested username
    { _id: 0, looks: 1 }, // only get looks field
    (err, data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).end(); // send 404, user not found
      }
    }
  );
});

// request for fit
// query: fit ID
// response: fit data
app.get("/api/fit", (req, res) => {
  // convert ID to nedb syntax
  dbFits.find({ _id: req.query.id }, (err, data) => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).end(); // send 404, fit not found
    }
  });
});
