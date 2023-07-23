const routers = require('express').Router();

routers.use('/questions',require('./questions'));


module.exports  = routers;