const express = require("express");

const ctrl = require('../../controllers/notices');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const authenticate = require("../../middlewares/authenticate");
const { validator } = require('../../middlewares/validationMidlewares');
const upload = require('../../middlewares/uploadFile');
const addNoticeSchema = require('../../schemas/notice');

const router = express.Router();

router.get('/category/:categoryName', ctrlWrapper(ctrl.getNoticeByCategory));

router.post('/add', authenticate, validator(addNoticeSchema), upload.single('petImage'), ctrlWrapper(ctrl.addNoticeToCategory));

router.get('/:id', ctrlWrapper(ctrl.findNoticeById));
// router.post('/favorites/:id', ctrl.addNoticeToFavorites);
// router.get('/favorites', ctrl.getUserFavorites);
// router.delete('/favorites/:id', ctrl.deleteNoticeFromFavorites);
router.get('/', authenticate, ctrlWrapper(ctrl.getUserNotices));

router.delete('/delete/:id', authenticate, ctrlWrapper(ctrl.deleteUserNotice));

module.exports = router;
