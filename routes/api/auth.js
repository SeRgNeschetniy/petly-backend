const express = require("express");

const ctrl = require("../../controllers/auth");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validator } = require("../../middlewares/validationMidlewares");
const { registerSchema, loginSchema } = require("../../schemas/auth");

const router = express.Router();

router.post("/register", validator(registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validator(loginSchema), ctrlWrapper(ctrl.login));

router.post("logout");

module.exports = router;
