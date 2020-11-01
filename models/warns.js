const { Schema, model } = require('mongoose');

const warns = Schema({
    idGuild: String,

    idMember: String,

    warns: [{

        fecha: String,

        mod: String,

        razon: String

    }]

});

module.exports = model('Warns', warns)