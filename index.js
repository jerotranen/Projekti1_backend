require('dotenv').config()
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const logger = require('./loggers')
const User = require('./user')
const usersRouter = require('./logins/usersRouter');
const loginRouter = require('./logins/login')
const formRouter = require('./misc/formRouter');
const morgan = require('morgan')
const cors = require('cors')

const app = express();

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/ilmot', formRouter);


// MONGOOSE
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected To MongoDB') 
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

    app.get('/users', async (req, res) => {
        const users = await User.find({});
        res.json(users);
      });

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;