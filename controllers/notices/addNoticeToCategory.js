const { Notice} = require('../../models/notice');
const RequestError = require('../../helpers/requestError');

const addNoticeToCategory = async (req, res) => {
    const { _id: owner } = req.user;
    const { title, name, dateOfBirth, breed } = req.body;
    const notice = await Notice.findOne({ title, name, dateOfBirth, breed });

    if (notice) {
        throw RequestError(400, 'Notice already exist');
    };

    const newNotice = await Notice.create({ ...req.body, owner });

    res.status(201).json(newNotice);
};


module.exports = addNoticeToCategory;