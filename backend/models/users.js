const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    givenName: {
        type: String,
        required: true        
    },
    familyName: {
        type: String,
        required: true
    },
    pfp: {
        type: String,
        required: true
    }
}, { collection: 'players' });

module.exports = mongoose.model('Player', playerSchema);