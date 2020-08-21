const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    users: {
        default: [],
        type: Array
    },
})
module.exports = model('Blacklist', Guild)