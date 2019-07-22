const express = require("express");
const Datastore = require("nedb");

const app = express();
app.use(express.static("./public")); // local site files
app.use(express.json()); // treat requests as JSON
app.listen(3000); // port for requests

const dbSrc = new Datastore("./db/sources.db");
dbSrc.loadDatabase();
const dbSug = new Datastore("./db/suggestions.db");
dbSug.loadDatabase();

// configure for gets
// response: all submissions
app.get("/api", (req, res) => {
  // get entries for requested look
  dbSrc.find(req.query, (err, data) => {
    if (err) {
      res.end();
      return; // nope outta there
    }

    res.json(data); // respond with db data
  });
});

app.post("/api", (req, res) => {
  req.body.breakdown = req.body.breakdown.filter(e => e.value !== ""); // remove empty values
  dbSug.insert(req.body); // add suggested
});
