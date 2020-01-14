"use strict";

// /user

const routes = require("express").Router();

let dbUsers, dbLooks, dbFits;

routes.get("/", async (req, res) => {
  // route with parameter
  res.redirect(`/user/${req.query.username}`);
});

routes.get("/:username", async (req, res) => {
  // find user
  const user = await dbUsers.findOne({ username: req.params.username }); // get user

  // check found
  if (user === null) {
    res.status(404).render("404");
    return;
  }

  // get fits, looks
  user.looks = await dbLooks.find({ owner: user._id }, { title: 1, desc: 1 });
  user.fits = await dbFits.find({ owner: user._id }, { img: 1 });

  res.render("user", user);
});

// export routes
module.exports = (_dbUsers, _dbLooks, _dbFits) => {
  dbUsers = _dbUsers;
  dbLooks = _dbLooks;
  dbFits = _dbFits;
  return routes;
};
