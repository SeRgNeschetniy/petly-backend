const express = require("express");

const ctrlUsers = require("../../controllers/auth");
const ctrlNotices = require("../../controllers/notices");

const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
  emailSchema,
} = require("../../schemas/auth");
const {
  validator,
  authenticate,
  passport,
  upload,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validator(registerSchema),
  ctrlWrapper(ctrlUsers.register)
);

router.post("/login", validator(loginSchema), ctrlWrapper(ctrlUsers.login));

router.post("/logout", authenticate, ctrlWrapper(ctrlUsers.logout));

router.get("/current", authenticate, ctrlWrapper(ctrlUsers.getUserInfo));

router.get("/refresh", ctrlWrapper(ctrlUsers.refresh));

router.patch(
  "/update",
  authenticate,
  validator(updateUserSchema),
  ctrlWrapper(ctrlUsers.updateUserInfo)
);

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrlUsers.updateUserAvatar)
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrlWrapper(ctrlUsers.google)
);

router.patch(
  "/restore",
  validator(emailSchema),
  ctrlWrapper(ctrlUsers.restorePass)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrlUsers.verify));

router.post(
  "/verify",
  validator(emailSchema),
  ctrlWrapper(ctrlUsers.resendVerifyEmail)
);

module.exports = router;
