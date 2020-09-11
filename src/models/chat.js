const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: { type: String, default: 'none' },

    token: {
        type: String,
        default: 'none'
    },

    chat: Array,

    users: Array,

    admins: Array,

    owner: {
        type: String,
        default: 'none'
    },

    type: {
        type: String,
        default: 'none'
    },

    max: {
        type: Number,
        default: 10
    }

});
module.exports = model('Chat', Guild)