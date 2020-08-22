const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,
    canal: {
        default: '',
        type: String
    },
})
module.exports = model('canal de xp', Guild)