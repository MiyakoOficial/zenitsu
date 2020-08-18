const { Schema, model } = require('mongoose');

const warns = Schema({
    id: String,
    warns: {
        default: 0,
        type: Number
    },
})

module.exports = model('Warns', warns)