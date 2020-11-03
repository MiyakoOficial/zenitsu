const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    bol: {
        default: false,
        type: Boolean
    },
    razon: {
        default: 'No especificada!',
        type: String
    }
})
module.exports = model('Blacklist', Guild)
