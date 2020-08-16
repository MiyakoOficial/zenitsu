const { Schema, model } = require('mongoose');

const Snipe = Schema({
    id: String,
    snipe: {
        default: '',
        type: String
    },
})

module.exports = model('Snipe', Snipe)