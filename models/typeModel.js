const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
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

const typeModel = mongoose.model('type', typeSchema);
module.exports = typeModel;