const { Schema, model } = require('mongoose');

const modelo = Schema({

    id: String,
    reason: { type: String, default: 'AFK' },
    date: { type: Number, default: 0 },
    status: { type: Boolean, default: false }

})

module.exports = model('afk', modelo)