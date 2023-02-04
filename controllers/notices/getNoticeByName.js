const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers/requestError");

const getNoticeByName = async (req, res) => {
    const { name } = req.params;
    const notices = await Notice.find({ $text: { $search: name } });

    if (!notices) {
      throw RequestError('Notices not found');
    }

    res.status(200).json({notices});
    
};

module.exports = getNoticeByName;