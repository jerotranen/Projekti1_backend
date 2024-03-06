const mongoose = require('mongoose');

const IlmoStatusSchema = new mongoose.Schema({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const IlmoStatus = mongoose.model('IlmoStatus', IlmoStatusSchema);

module.exports = IlmoStatus;