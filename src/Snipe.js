const { Schema, model } = require('mongoose');

const Snipe = Schema({
    id: String,
    snipe: {
        default: 'defaultValue',
        type: String
    },
    author: {
        default: 'defaultValue',
        type: String
    }
})

module.exports = model('Snipe', Snipe)