// Imports
const itemModel = require("../models/urlModel");
const validUrl = require("valid-url");

// Code
const generateUrl = async (req, res) => {
  try {
    // if (!FindUrlByURL(url)) {
    const shortUrl = randomStringGenerator();
    let model = new itemModel.item({
      longUrl: req.body.url,
      shortId: shortUrl,
      shortUrl: `${process.env.BASE_URL}/${shortUrl}`,
    });
    return !validUrl.isUri(process.env.BASE_URL)
      ? res.status(401).json({
          status: 401,
          response: { message: "Internal error. Please come back later." },
        })
      : res.status(201).json({ status: 201, response: await model.save() });
  } catch (err) {}
};

const getOriginalURL = async (req, res) => {
  try {
    const id = req.params.shortId;
    const obj = await FindUrlByShortId(id);

    let clickCount = obj.clickCount;
    clickCount++;
    await obj.update({ clickCount });

    const analyticsObj = new itemModel.analytics({
      urlId: obj._id,
      ip: req.ip,
      dateTime: Date.now(),
    });

    await analyticsObj.save();

    return obj
      ? res.redirect(obj.longUrl)
      : res
          .status(400)
          .json({ status: 400, response: { message: "URL not found" } });

    // res.redirect(response.originalUrl);
  } catch (err) {
    res.status(500).json({ status: 500, response: err });
  }
};

const getAllUrls = async (req, res) => {
  try {
    console.log(req.ip);
    res
      .status(200)
      .json({ status: 200, response: await itemModel.item.find() });
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
