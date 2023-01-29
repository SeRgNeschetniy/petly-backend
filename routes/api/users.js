const express = require("express");
const getUserInfo = require("../../controllers/auth/getUserInfo.js");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/current", authenticate, getUserInfo);

module.exports = router;
