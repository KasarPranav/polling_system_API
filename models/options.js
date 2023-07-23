const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Questions'
    },
    votes: {
        type: Number
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Options',optionSchema);