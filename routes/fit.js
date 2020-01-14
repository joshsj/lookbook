"use strict";

// /fit

const routes = require("express").Router();

let dbUsers, dbFits;

routes.get("/", async (req, res) => {
  // route with parameter
  res.redirect(`/fit/${req.query.id}`);
});

routes.get("/:id", async (req, res) => {
  // get fit
  const fit = await dbFits.findOne({ _id: req.params.id }); // get user

  // check found
  if (fit === null) {
    res.status(404).render("404");
    return;
  }

  // get owner username
  fit.owner = (
    await dbUsers.findOne(
      { _id: fit.owner },
      { _id: 0, username: 1 } // fields
    )
  ).username;

  res.render("fit", fit);
});

// export routes
module.exports = (_dbUsers, _dbFits) => {
  dbUsers = _dbUsers;
  dbFits = _dbFits;
  return routes;
};
