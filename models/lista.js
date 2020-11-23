const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    elementos: [{
        date: String,
        message: String,
        id: String
    }],
})
module.exports = model('lista', Guild)