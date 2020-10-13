const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    channellogs: {
        default: '',
        type: String
    },
})
module.exports = model('Logs', Guild)