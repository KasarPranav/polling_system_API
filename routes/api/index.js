const routers = require('express').Router();

routers.use('/api',require('./V1/index.js'));



module.exports = routers