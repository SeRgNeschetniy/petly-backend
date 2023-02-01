const User = require('../../models/users');
const { RequestError } = require('../../helpers/requestError');

const deleteNoticeFromFavorites = async (req, res) => {
    const { noticeId } = req.params;
    const { id: userId } = req.user;

    const user = await User.updateOne({ _id: userId }, { $pull: { favorites: noticeId } });
    if (!user) {
      throw RequestError('Unable to delete Notice from favorites.');
    }

    res.status(200).json({ message: 'Notice was deleted from Favorite.' });
};

module.exports = deleteNoticeFromFavorites;