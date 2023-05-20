const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    number:{
        type: Number,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
        unique: true,
        maxLength: 20
    },
    type:{
        type: String,
        required: true,
        ref: 'type'
    },
    description:{
        type: String,
        required: true,
        maxLength: 500
    },
    image:{
        type: String,
    }
});

const pokemonModel = mongoose.model('pokemon', pokemonSchema);
module.exports = pokemonModel;