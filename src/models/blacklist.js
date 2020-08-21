const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    bol: {
        default: false,
        type: Boolean
    },
})
module.exports = model('Blacklist', Guild)