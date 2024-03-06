const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
    unique: true
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;