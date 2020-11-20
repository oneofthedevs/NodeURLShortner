// External
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// CONNECTION_STRING=mongodb+srv://oneofthedevs:$LetMeIn!@urlshortner.m8chg.mongodb.net/URLShortner?retryWrites=true&w=majority
// PORT=5000
// BASE_URL=http://localhost:5000

// Internal
const urlController = require("./controller/url");

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
app.get("/getAll", urlController.getAllUrls);
app.post("/generateURL", urlController.generateUrl);
app.get("/:shortId", urlController.getOriginalURL);
app.use(urlController.invalidURL);

// Listen
app.listen(process.env.PORT, () => {
  console.log("Running on Port: " + process.env.PORT);
});
