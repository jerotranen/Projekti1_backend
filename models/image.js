const mongoose = require('mongoose');

// Schema kuvalle. URL määrittää kuvan

const imageSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
    unique: true
  }
}, {versionKey: false});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;