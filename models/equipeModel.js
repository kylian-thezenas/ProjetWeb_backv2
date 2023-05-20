const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({
    nameDresseur:{
        type: String,
        required: true,
        unique: true,
        ref: 'dresseur'
    },
    pokemon1:{
        type: Number,
        required: true,
        ref: 'pokemon'
    },
    pokemon2:{
        type: Number,
        required: false,
        ref: 'pokemon'
    },
    pokemon3:{
        type: Number,
        required: false,
        ref: 'pokemon'
    },
    pokemon4:{
        type: Number,
        required: false,
        ref: 'pokemon'
    },
    pokemon5:{
        type: Number,
        required: false,
        ref: 'pokemon'
    },
    pokemon6:{
        type: Number,
        required: false,
        ref: 'pokemon'
    }
});

const equipeModel = mongoose.model('equipe', equipeSchema);
module.exports = equipeModel;