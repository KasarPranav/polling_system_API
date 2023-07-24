const routers = require('express').Router();

// route for api version 1
routers.use('/api/v1',require('./V1/index.js'));
routers.get('/',(req,res)=>{
    return res.render('home');
})
module.exports = routers