const { Schema, model } = require('mongoose');

const modelo = Schema({
    idGuild: String,
    idMessage: { type: String, default: 'NO' }
})

module.exports = model('among us', modelo)