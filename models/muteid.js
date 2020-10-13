const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    idMessage: {
        default: 'id',
        type: String
    },
})
module.exports = model('id message', Guild)