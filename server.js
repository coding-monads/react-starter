require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const test = require("./routes/api/test");

const users = require("./routes/api/users");

const app = express();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect Database
connectDB();

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Routes
app.use("/api/test", test);
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
