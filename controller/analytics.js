const itemModel = require("../models/urlModel");

// Endpoints
exports.getAnalyticsgetAnalytics = async (req, res) => {
  try {
    const objs = await get_id(req.body.url);

    objs.length > 0
      ? res.status(200).json({ status: 200, response: objs })
      : res.status(204).json({ status: 204 });
  } catch (err) {
    res.status(500).json({ status: 500, response: { message: err } });
  }
};

// Internal
const get_id = async (url) => {
  try {
    const obj = await itemModel.item.findOne({ shortUrl: url });
    if (obj) {
      return fetchAnalytics(obj._id);
    }
    throw Error("Not Found");
  } catch (err) {
    return err;
  }
};

const fetchAnalytics = async (id) => {
  try {
    const arr = await itemModel.analytics
      .find({ urlId: id })
      .select("dateTime -_id");
    // .populate("urlId", "clickCount -_id");

    return arr ? arr : null;
  } catch (err) {
    throw Error("Some error occured");
  }
};
