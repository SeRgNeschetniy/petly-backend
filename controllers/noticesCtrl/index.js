const getNoticeByCategory = require('./getNoticeByCategory');
const findNoticeById = require('./findNoticeById');
const addNoticeToFavorites = require('./addNoticeToFavorites');
const getUserFavorites = require('./getUserFavorites');
const deleteNoticeFromFavorites = require('./deleteNoticeFromFavorites');
const addNoticeToCategory = require('./addNoticeToCategory');
const getUserNotices = require('./getUserNotices');
const deleteUserNotice = require('./deleteUserNotice');

module.exports = {
    getNoticeByCategory,
    findNoticeById,
    addNoticeToFavorites,
    getUserFavorites,
    deleteNoticeFromFavorites,
    addNoticeToCategory,
    getUserNotices,
    deleteUserNotice,
}