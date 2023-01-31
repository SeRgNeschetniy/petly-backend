const express = require("express");
const getNews = require("../../controllers/news/getNews");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const router = express.Router();


router.get('/', ctrlWrapper(getNews));


module.exports = router;
