const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  originalUrl: {
    type: String,
    require: true,
  },
  shortId: {
    type: String,
    require: true,
  },
  url: {
    type: String,
  },
});

const item = mongoose.model("Item", itemSchema);

module.exports = {
  item,
};
