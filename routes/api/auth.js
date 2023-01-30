const express = require("express");

const ctrl = require("../../controllers/auth");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const authenticate = require("../../middlewares/authenticate");
const { validator } = require("../../middlewares/validationMidlewares");
const upload = require("../../middlewares/uploadFile");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
} = require("../../schemas/auth");

const router = express.Router();

router.post("/register", validator(registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validator(loginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getUserInfo));

router.patch(
  "/update",
  authenticate,
  validator(updateUserSchema),
  ctrlWrapper(ctrl.updateUserInfo)
);

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateUserAvatar)
);

module.exports = router;
