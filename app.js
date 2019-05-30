const express = require("express");
const app = express();

const passport = require("passport");
const test = require("./routes/api/test");

const users = require("./routes/api/users");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/test", test);
app.use("/api/users", users);

module.exports = app