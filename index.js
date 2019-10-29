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

  // user exists, proceed to page with query
  res.redirect(`/user.html?username=${req.query.username}`);
});

// user looks + fits
app.get("/looks", async (req, res) => {
  if (!req.query.username) {
    // no username, go home
    res.redirect("/");
  }

  // get user looks
  const user = await dbUsers.findOne({ username: req.query.username });

  // check user found
  if (user === null) {
    res.json(null); // send no data
  }

  const data = []; // data for response
  const lookIDs = user.looks;

  // get looks + fits data
  for (const lookID of lookIDs) {
    const look = await dbLooks.findOne(
      { _id: lookID },
      { _id: 0 } // remove ID
    );

    // replace owner _id with username
    look.owner = (await dbUsers.findOne(
      { _id: look.owner },
      { looks: 0, _id: 0 }
    )).username;

    const fitIDs = look.fits;
    look.fits = []; // clear array to populate with fit data

    // get fit info
    for (const fitID of fitIDs) {
      const fit = await dbFits.findOne({ _id: fitID }, { _id: 0 });

      look.fits.push(fit); // save fit details
    }

    data.push(look); // add completed look
  }

  res.json(data); // respond
});
