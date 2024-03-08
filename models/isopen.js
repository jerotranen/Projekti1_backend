const mongoose = require('mongoose');

// Schema ilmoittautumisen statukselle. True tai False

const IlmoStatusSchema = new mongoose.Schema({
  isOpen: {
    type: Boolean,
    default: false
  }
}, {versionKey: false});

const IlmoStatus = mongoose.model('IlmoStatus', IlmoStatusSchema);

module.exports = IlmoStatus;