const { Schema, model } = require('mongoose');

const Guild = Schema({
    idGuild: String,
    idMember: String,
    xp: {
        default: 0,
        type: Number
    },
    nivel: {
        default: 0,
        type: Number
    }
})
module.exports = model('Niveles', Guild)