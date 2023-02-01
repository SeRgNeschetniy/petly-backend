const express = require("express");

const ctrl = require("../../controllers/notices");
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

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrlWrapper(ctrl.google)
);

router.patch("/restore", validator(emailSchema), ctrlWrapper(ctrl.restorePass));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validator(emailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post(
  "/favorites/:id",
  authenticate,
  ctrlWrapper(ctrl.addNoticeToFavorites)
);
router.get("/favorites", authenticate, ctrlWrapper(ctrl.getUserFavorites));
router.delete(
  "/favorites/:id",
  authenticate,
  ctrlWrapper(ctrl.deleteNoticeFromFavorites)
);
router.get("/notices", authenticate, ctrlWrapper(ctrl.getUserNotices));
router.delete("/delete/:id", authenticate, ctrlWrapper(ctrl.deleteUserNotice));

module.exports = router;
