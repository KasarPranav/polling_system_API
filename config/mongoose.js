const mongoose = require('mongoose');

const pass = 'acer8551';
const URI = `mongodb+srv://systemAdmin:${pass}@cluster0.fivsy0t.mongodb.net/?retryWrites=true&w=majority`;

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