const express = require("express");

const ctrl = require("../../controllers/notices");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const authenticate = require("../../middlewares/authenticate");
const { validator } = require("../../middlewares/validationMidlewares");
const upload = require("../../middlewares/uploadFile");
const addNoticeSchema = require("../../schemas/notice");

const router = express.Router();

router.post(
  "/",
  authenticate,
  //  validator(addNoticeSchema),
  upload.single("petImage"),
  ctrlWrapper(ctrl.addNoticeToCategory)
);

router.get("/find/:id", ctrlWrapper(ctrl.findNoticeById));

router.get("/favorites", authenticate, ctrlWrapper(ctrl.getUserFavorites));
router.post(
  "/:noticeId/favorites",
  authenticate,
  ctrlWrapper(ctrl.addNoticeToFavorites)
);
router.delete(
  "/:noticeId/favorites",
  authenticate,
  ctrlWrapper(ctrl.deleteNoticeFromFavorites)
);

router.get("/own", authenticate, ctrlWrapper(ctrl.getUserNotices));
router.delete("/:noticeId", authenticate, ctrlWrapper(ctrl.deleteUserNotice));

router.get("/:categoryName", ctrlWrapper(ctrl.getNoticeByCategory));

router.get("/search/:name", ctrlWrapper(ctrl.getNoticeByName));

module.exports = router;
