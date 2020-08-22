const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    canal: {
        default: '',
        type: String
    },
})
module.exports = model('Logs', Guild)