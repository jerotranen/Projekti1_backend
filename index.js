require('dotenv').config()
const cors = require('cors')
const http = require('http')
const https = require('https');
const fs = require('fs');
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const logger = require('./loggers')
const usersRouter = require('./logins/usersRouter');
const loginRouter = require('./logins/login')
const formRouter = require('./misc/formRouter');
const morgan = require('morgan')
const ilmoStatusRouter = require('./misc/isopenrouter');
const imageRouter = require('./misc/imageRouter');
const app = express();
app.use(cors())

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/ilmot', formRouter);
app.use('/status', ilmoStatusRouter);
app.use('/image', imageRouter);

// MONGOOSE
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected To MongoDB') 
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

    const serverOptions = {
      key: fs.readFileSync('./certs/server.key'),
      cert: fs.readFileSync('./certs/server.cert')
    };
    
    const server = https.createServer(serverOptions, app);
    
    server.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });

module.exports = app;