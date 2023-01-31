const User = require('../../models/users');
const RequestError = require('../../helpers/requestError');

const addNoticeToFavorites = async (req, res) => {

  const { id: noticeId } = req.params;
  const { id: userId } = req.user;

  const user = await User.updateOne({ _id: userId }, { $push: { favorites: noticeId }});

    if (!user) {
      throw RequestError('Unable to add Notice to favorites.');
    }
    
    res.status(200).json('Notice was added to favorites.' );
};

module.exports = addNoticeToFavorites;