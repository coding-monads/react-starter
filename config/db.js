const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");

const connectDB = () =>

  console.log("Trying to connect to mongodb [URI] ", dbURI)

  mongoose
    .connect(dbURI,  { 
      user: "root",
      pass: "example",
      useNewUrlParser: true, 
      useCreateIndex: true, 
      useFindAndModify: false 
    })
    .then(() => console.log("MoongoDB Connected"))
    .catch(err => console.log("MoongoDB not connected", err));

module.exports = connectDB;
