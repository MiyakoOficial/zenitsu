const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    channellogs: {
        default: 'undefined',
        type: String
    }
})

module.exports = model('Guild', Guild)