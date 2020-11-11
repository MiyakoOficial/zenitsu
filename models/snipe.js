const { Schema, model } = require('mongoose');

const Snipe = Schema({
    id: String,
    mensaje: String,
    avatarURL: String,
    nombre: String
});

module.exports = model('Snipe', Snipe)