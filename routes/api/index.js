const routers = require('express').Router();

// route for api version 1
routers.use('/api/v1',require('./V1/index.js'));

module.exports = routers