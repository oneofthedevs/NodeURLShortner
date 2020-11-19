// Imports
const itemModel = require("../models/urlModel");

// Code
const generateUrl = async (req, res) => {
  try {
    const url = req.body.url;
    // if (!FindUrlByURL(url)) {
    let randomString = randomStringGenerator();
    let model = new itemModel.item({
      originalUrl: url,
      shortId: randomString,
      url: `URL+${randomString}`,
    });
    const response = await model.save();
    res.status(201).json({ status: 201, response: response });
    // }
    // res
    //   .status(400)
    //   .json({ status: 400, response: { message: "URL already exist" } });
  } catch (err) {}
};

const getOriginalURL = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await FindUrlByShortId(id);
    if (!response) {
      return res
        .status(200)
        .json({ status: 200, response: { originalUrl: response.originalUrl } });
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

// Internal methods
const FindUrlByShortId = async (id) => {
  try {
    const obj = await itemModel.item.find({ shortId: id });
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
};
