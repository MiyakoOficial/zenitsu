const { Schema, model } = require('mongoose');

const warns = Schema({
    id: String,
    warns: {
        default: 0,
        type: Number
    },
    razon: {
        default: '',
        type: String
    }
})

module.exports = model('Warns', warns)