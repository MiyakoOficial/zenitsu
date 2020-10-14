const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    channellogs: {
        default: 'default',
        type: String
    },
})
module.exports = model('Logs', Guild)