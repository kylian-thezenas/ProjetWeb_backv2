const mongoose = require('mongoose');

const carteSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    }
});

const carteModel = mongoose.model('carte', carteSchema);
module.exports = carteModel;