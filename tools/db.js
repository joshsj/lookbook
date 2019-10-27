// for database editing

const datastore = require("nedb-promises"); // nedb with native promise wrapper
const dbUsers = datastore.create("./db/users.db");
const dbLooks = datastore.create("./db/looks.db");
const dbFits = datastore.create("./db/fits.db");

(async () => {
  // code here

  // modifying adds records, opening merges records with same ID
  // this forces the merge
  dbUsers.persistence.compactDatafile();
  dbFits.persistence.compactDatafile();
  dbLooks.persistence.compactDatafile();
})();
