const { Schema, model } = require('mongoose');

const Guild = Schema({

    id: String,

    monstruos: {
        type: Number,
        default: 0
    },

    nivelenemigo: {
        type: Number,
        default: 1
    },

    nivelespada: {
        type: Number,
        default: 1
    },

    nivelusuario: {
        type: Number,
        default: 1
    },

    xpusuario: {
        type: Number,
        default: 0
    },

    cooldown: {
        type: Number,
        default: 0
    },

    jefes: {
        type: Number,
        default: 0
    },

    dinero: {
        type: Number,
        default: 10
    }

});

module.exports = model('demonios', Guild)