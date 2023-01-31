const User = require('../../models/users');
const { RequestError } = require('../../helpers/requestError');

const deleteUserNotice = async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;

    await User.findOneAndDelete(noticeId);

     const user = await User.updateOne({ _id: userId }, { $pull: { notices: noticeId } });
    if (!user) {
      throw RequestError('Unable to delete Notice');
    }
    
    res.status(200).json({ message: 'Notice was deleted.' });
};

module.exports = deleteUserNotice;