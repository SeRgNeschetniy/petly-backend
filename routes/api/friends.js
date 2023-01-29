const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers/friends");

const router = express.Router();

router.get("/friends", ctrlWrapper(ctrl.getFriends));
