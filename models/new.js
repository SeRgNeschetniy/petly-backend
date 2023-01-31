const { Schema, model } = require('mongoose');

const handleSchemaErrors = require('../middlewares/handleSchemaErrors');

const newsSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

newsSchema.post('save', handleSchemaErrors);

const New = model('new', newsSchema);

module.exports = New;
