const express = require("express");

const ctrl = require('../../controllers/notices');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post('/favorites/:id',authenticate, ctrlWrapper(ctrl.addNoticeToFavorites));

router.get('/favorites', authenticate, ctrlWrapper(ctrl.getUserFavorites));

router.delete('/favorites/:id', authenticate, ctrlWrapper(ctrl.deleteNoticeFromFavorites));

router.get('/notices', authenticate, ctrlWrapper(ctrl.getUserNotices));

router.delete('/delete/:id', authenticate, ctrlWrapper(ctrl.deleteUserNotice));

module.exports = router;