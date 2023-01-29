const express = require('express');
const getNews = require('../../controllers/auth/getNews');

const router = express.Router();

router.get('/news', getNews);

module.exports = router;
