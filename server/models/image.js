const mongoose = require('mongoose');

ImageSchema = new mongoose.Schema({
  filename: {
    type: String
  },
  filetype: {
    type: String
  },
  value: {
    type: String
  }
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = { Image }
