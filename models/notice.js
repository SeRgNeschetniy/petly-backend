const { model, Schema } = require('mongoose');

const handleSchemaErrors = require('../middlewares/handleSchemaErrors');

const noticeSchema = new Schema({
    tittle: {
        type: String,
        required: [true, 'Title of add is required.']
    },
    name: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
     breed: {
        type: String,
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Sex is required.']
    },
    location: {
        type: String,
        required: [true, 'Location is required.']
    },
    price: {
        type: String
    },
    comments: {
        type: String
    },
    category: {
        type: String,
        enum: ['sell', 'lost-found', 'inGoodHands'],
        required: [true, 'Category is required.']
    },
    petImage: {
        type: String
    },
    owner: {
       type: Schema.Types.ObjectId,
       ref: 'users',
    },

}, { versionKey: false, timestamps: true });

noticeSchema.post('save', handleSchemaErrors);

const Notice = model("notice", noticeSchema);

module.exports = { Notice, noticeSchema};
