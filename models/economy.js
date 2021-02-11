const { Schema, model } = require('mongoose');

const Guild = Schema({

    id: String,
    money: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    bombs: { type: Number, default: 0 },
    shields: { type: Number, default: 0 },
    maxSpace: { type: Number, default: 1500 },
    pet: { type: Object, default: {} }

})
module.exports = model('Economy', Guild)