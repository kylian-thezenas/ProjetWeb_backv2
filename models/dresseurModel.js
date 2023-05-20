const mongoose = require('mongoose');

const dresseurSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        maxLength: 20
    },
    description:{
        type: String,
        maxLength: 500
    },
    image:{
        type: String,

    }
});

const dresseurModel = mongoose.model('dresseur', dresseurSchema);
module.exports = dresseurModel;