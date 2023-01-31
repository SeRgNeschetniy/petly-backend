const User = require('../../models/users');
const { RequestError } = require('../../helpers/requestError');

const getUserNotices = async (req, res) => {
  const {id} = req.user;
  const user = await User.findById(id).populate('notices');

  if (!user) {
      throw RequestError('Unable to get Notices.');
  }
  const notices = user.notices;

  res.status(200).json({status: 'success', notices });
};

module.exports = getUserNotices;