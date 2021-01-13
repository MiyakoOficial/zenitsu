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
    },
    cacheName: {
        default: 'none',
        type: String
},
    disableNotify: {
        default: false,
        type: Boolean
    }
})
module.exports = model('Niveles', Guild)
