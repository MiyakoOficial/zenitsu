const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    elementos: {
        default: [],
        type: Array
    },
})
module.exports = model('lista', Guild)