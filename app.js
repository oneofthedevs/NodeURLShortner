// External
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Internal

// Middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connection
mongoose.connect(
  process.env.CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    try {
      console.log("Connection Successful");
    } catch {
      console.log(err);
    }
  }
);

// Code
// Listen
app.listen(process.env.PORT, () => {
  console.log("Running on Port: " + process.env.PORT);
});
