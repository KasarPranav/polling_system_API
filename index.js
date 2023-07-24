const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const db = require('./config/mongoose');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);

app.use(express.urlencoded({extended:true}));
app.use('/',require('./routes/api'));

app.listen(PORT,(err)=>{
    if(err){
        console.log("Error in running server on PORT: ",PORT);
    }
    console.log("Server is up  and running on PORT: ",PORT)
})