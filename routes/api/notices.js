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

module.exports = router;
