const routers = require('express').Router();

routers.use('/api/v1',require('./V1/index.js'));



module.exports = routers