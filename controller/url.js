// Imports
const itemModel = require("../models/urlModel");
const validUrl = require("valid-url");

// Code
const generateUrl = async (req, res) => {
  try {
    const url = req.body.url;
    // if (!FindUrlByURL(url)) {
    let randomString = randomStringGenerator();
    let model = new itemModel.item({
      longUrl: url,
      shortId: randomString,
      shortUrl: `${process.env.BASE_URL}/${randomString}`,
    });
    if (!validUrl.isUri(process.env.BASE_URL)) {
      return res.status(401).json({
        status: 401,
        response: { message: "Internal error. Please come back later." },
      });
    }
    const response = await model.save();
    res.status(201).json({ status: 201, response: response });
  } catch (err) {}
};

const getOriginalURL = async (req, res) => {
  try {
    const id = req.params.shortId;
    const response = await FindUrlByShortId(id);
    // response.clickCount++;
    // response.s
    // await response.updateOne(
    //   { shortId: shortId },
    //   {
    //     longUrl: response.longUrl,
    //     shortId: response.shortId,
    //     shortUrl: response.shortUrl,
    //     clickCount: response.clickCount++,
    //   }
    // );
    if (response) {
      return res.status(200).json({
        status: 200,
        response: response,
      });
    }
    res.redirect(response.originalUrl);
  } catch (err) {
    res.status(500).json({ status: 500, response: err });
  }
};

const getAllUrls = async (req, res) => {
  try {
    const response = await itemModel.item.find();
    res.status(200).json({ status: 200, response: response });
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
    const obj = await itemModel.item.findOne({ shortId: id });
    if (obj) {
      return obj;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

const FindUrlByURL = async (url) => {
  try {
    const obj = itemModel.item.find({ url: url });
    if (obj) {
      return obj;
    }
    return false;
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
