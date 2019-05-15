const express = require("express");
const connectDB = require("./config/db");
const test = require("./routes/api/test");

const app = express();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect Database
connectDB();

//Routes
app.use("/api/test", test);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
