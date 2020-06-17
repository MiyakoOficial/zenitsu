const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    channellogs: {
        default: 'defaultValue',
        type: String
    }
})

module.exports = model('Guild', Guild)