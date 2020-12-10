// Imports
const itemModel = require("../models/urlModel");
const validUrl = require("valid-url");
ObjectId = require("mongodb").ObjectID;

// Code
const generateUrl = async (req, res) => {
  try {
    const shortUrl = randomStringGenerator();
    let model = new itemModel.item({
      longUrl: req.body.url,
      shortId: shortUrl,
      shortUrl: `${req.protocol}://${req.get("host")}/${shortUrl}`,
    });
    return !validUrl.isUri(req.body.url)
      ? res.status(400).json({
          status: 400,
          response: { message: "Please enter valid URL" },
        })
      : res.status(201).json({ status: 201, response: await model.save() });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, response: { message: "Internal sever error" } });
  }
};

const getOriginalURL = async (req, res) => {
  try {
    const id = req.params.shortId;
    const obj = await FindUrlByShortId(id);

    if (obj) {
      let clickCount = obj.clickCount;
      clickCount++;
      await obj.update({ clickCount });

      const analyticsObj = new itemModel.analytics({
        urlId: new ObjectId(obj._id),
        ip: req.ip,
        dateTime: Date.now(),
      });

      await analyticsObj.save();

      return res.redirect(obj.longUrl);
    } else
      res
        .status(400)
        .json({ status: 400, response: { message: "URL not found" } });
  } catch (err) {
    res.status(500).json({ status: 500, response: err });
  }
};

const getAllUrls = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      response: await itemModel.item.find().select("-__v -_id"),
    });
  } catch (err) {
    res.status(500).json({ status: 500, response: err });
  }
};

const invalidURL = (req, res) => {
  res.status(400).json({ status: 400, response: { message: "Bad Request" } });
};

// Internal methods
const FindUrlByShortId = async (id) => {
  try {
    return (await itemModel.item.findOne({ shortId: id })) || false;
  } catch (err) {
    console.log(err);
  }
};

const FindUrlByURL = async (url) => {
  try {
    return itemModel.item.find({ url: url }) || false;
  } catch (err) {
    console.log(err);
  }
};

const randomStringGenerator = () => {
  return Math.random().toString(36).substring(2, 7);
};

module.exports = {
  generateUrl,
  getAllUrls,
  getOriginalURL,
  invalidURL,
};
