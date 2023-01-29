const express = require("express");
const getUserInfo = require("../../controllers/auth/getUserInfo.js");

const router = express.Router();

router.get("/current", getUserInfo);

module.exports = router;
