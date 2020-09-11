const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: { type: String, default: 'none' },
    tokenChat: { type: String, default: 'none' }

});
module.exports = model('Chat', Guild)