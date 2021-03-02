const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    idWeb: String,
    tokenWeb: String
})
module.exports = model('Logs member', Guild)