const express = require("express");

const app = express();
app.use(express.static("./public")); // config for local files
app.listen(3000);
