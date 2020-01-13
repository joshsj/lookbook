// /user

const routes = require("express").Router();

routes.get("/", async (req, res) => {
  // route with parameter
  res.redirect(`/user/${req.query.username}`);
});

routes.get("/:username", async (req, res) => {
  // find user
  const user = await dbUsers.findOne({ username: req.params.username }); // get user

  // check found
  if (user === null) {
    res.redirect("/404");
  }

  res.redirect("/user.html");
});

// export routes
module.exports = function(dbUsers) {
  this.dbUsers = dbUsers;
  return routes;
};
