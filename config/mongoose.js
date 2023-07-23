const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGO_URL;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection; 

db.on('error',console.error.bind(console,'error while connecting to database'))

db.once('open',function(){
    console.log('successfully connected to the database');
})

module.exports = db;