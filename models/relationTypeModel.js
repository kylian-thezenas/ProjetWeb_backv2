const mongoose = require('mongoose');

const relationTypeSchema = new mongoose.Schema({
    typeFort:{
        type: Number,
        required: true,
        ref: 'type'
    },
    typeFaible:{
        type: String,
        required: true,
        ref: 'type'
    },

});

const typeModel = mongoose.model('type', typeSchema);
module.exports = typeModel;