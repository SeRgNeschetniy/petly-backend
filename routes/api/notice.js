const express = require('express');

const router = express.Router();

router.get('/category/:categoryName', ctrl.getNoticeByCategory);
router.get('/:id', ctrl.findNoticeById);
router.post('/favorites/:id', ctrl.addNoticeToFavorites);
router.get('/favorites', ctrl.getUserFavorites);
router.delete('/favorites/:id', ctrl.deleteNoticeFromFavorites);
router.post('/add',  ctrl.addNoticeToCategory);
router.get('/notices', ctrl.getUserNotices);
router.delete('/notices/:id', ctrl.deleteUserNotice);

module.exports = router;