const mongoose = require('mongoose');

const favorisSchema = new mongoose.Schema({
    userName:{
        type: String,
        ref: 'user',
        required: true
    },
    pokemonName:{
        type: String,
        ref: 'pokemon',
        required: true
    }
});

favorisSchema.index({ userName: 1, pokemonName: 1 }, { unique: true });

const favorisModel = mongoose.model('favoris', favorisSchema);
module.exports = favorisModel;