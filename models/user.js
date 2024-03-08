const mongoose = require('mongoose')

// Käyttäjälle schema

const userSchema = mongoose.Schema({
  sposti: String,
  name: String,
  passwordHash: String,
}, { versionKey: false })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User