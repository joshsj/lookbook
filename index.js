const express = require("express");
const Datastore = require("nedb");

const app = express();
app.use(express.static("./public")); // local site files
app.use(express.json()); // treat requests as JSON
app.listen(3000); // port for requests

const db = new Datastore("./db/submissions.db");
db.loadDatabase();

// const d = require("./sources.json");

// Object.keys(d).forEach(key => {
//   d[key].forEach(e => {
//     db.insert({
//       look: key,
//       imageURL: e.img,
//       sourceURL: e.page,
//       desc: e.alt
//     });
//   });
// });

// configure for gets
// response: all submissions
app.get("/api", (req, res) => {
  // get entries for requested look
  db.find(req.query, (err, data) => {
    if (err) {
      res.end();
      return; // nope outta there
    }

    res.json(data); // respond with db data
  });
});
