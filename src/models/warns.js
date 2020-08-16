const { Schema, model } = require('mongoose');

const Snipe = Schema({
    id: String,
    warnCount: {
        default: 0,
        type: Number
    },
})

module.exports = model('Snipe', Snipe)