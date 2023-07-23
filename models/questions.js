const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Options'
    }]
},{
    timestamps:true
});

module.exports = new mongoose.model('Questions',questionSchema);