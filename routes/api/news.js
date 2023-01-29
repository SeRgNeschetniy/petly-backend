const express = require('express');
const getNews = require('../../controllers/auth/getNews');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

const router = express.Router();

router.get('/news', ctrlWrapper(getNews));

module.exports = router;
