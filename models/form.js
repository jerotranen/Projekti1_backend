const mongoose = require('mongoose');

// Schema ilmoittautumiselle

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sposti: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {versionKey: false});

const Form = mongoose.model('Ilmo', formSchema);

module.exports = Form;