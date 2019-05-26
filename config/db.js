const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () =>
  mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("MoongoDB Connected"))
    .catch(err => console.log("MoongoDB not connected"));

module.exports = connectDB;
