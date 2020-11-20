const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  // This is the URL which we need to short
  longUrl: {
    type: String,
    require: true,
  },
  // This will store the unique id related to each URL
  shortId: {
    type: String,
    require: true,
  },
  // This is the actual short URL
  shortUrl: {
    type: String,
    require: true,
  },
  // This stores how many times users have used the short URL
  clickCount: {
    type: Number,
    default: 0,
  },
});

const item = mongoose.model("Item", itemSchema);

module.exports = {
  item,
};
