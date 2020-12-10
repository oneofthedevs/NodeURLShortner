// External
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const http = require("http");

// Internal
const urlController = require("./controller/url");
const analyticsController = require("./controller/analytics");

// Middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  // http.get(() => {
  //   console.log(res);
  // });
  console.log();
  next();
});

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
app.post("/analytics", analyticsController.getAnalyticsgetAnalytics);
app.use(urlController.invalidURL);

// Listen
app.listen(process.env.PORT || 3000, () => {
  console.log("Running on Port: " + (process.env.PORT || 3000));
});
