const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Router käyttäjän luomiselle tms

usersRouter.post('/', async (request, response) => {
    const { sposti, name, password } = request.body
  
    const existingUser = await User.findOne({ sposti })
    if (existingUser) {
      return response.status(400).json({
        error: 'Sähköposti on jo käytössä'
      })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      sposti,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  })

  usersRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });

module.exports = usersRouter