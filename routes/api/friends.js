const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const getFriends = require("../../controllers/friends");

const router = express.Router();

router.get(
  "/friends",
  ctrlWrapper(async (req, res) => {
    const result = await getFriends();
    res.json(result);
  })
);

module.exports = router;
