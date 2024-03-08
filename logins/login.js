const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
require('dotenv').config();

// Router loginille

loginRouter.post('/', async (request, response) => {
  const { sposti, password } = request.body

  const user = await User.findOne({ sposti })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid sposti or password'
    })
  }
  
  const userForToken = {
    sposti: user.sposti,
    id: user._id,
    isAdmin: user.id === process.env.ADMIN_ID
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, sposti: user.sposti, name: user.name, id: user.id, isAdmin: userForToken.isAdmin })
})

module.exports = loginRouter