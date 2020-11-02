const { Schema, model } = require('mongoose');

const Guild = Schema({

    id: String,

    warnsParaKickear: { default: 5, type: Number },

    sistemaDeNiveles: { default: true, type: Boolean },

    mostrarAnuncio: { default: true, type: Boolean }

})

module.exports = model('Configuraciones', Guild);