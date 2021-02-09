const { Schema, model } = require('mongoose');

const modelo = Schema({
    type: String,
    id: String,
    role: String,
    guild: String,
    toDelete: Number,
    tiempo: Number
})

module.exports = model('temp', modelo)