const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: { type: String, default: 'none' },
    tokenChat: { type: String, default: 'none' },
    grupos: Array,
    unidos: Array

});
module.exports = model('usuariosChat', Guild)