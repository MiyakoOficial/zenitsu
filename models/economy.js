const { Schema, model } = require('mongoose');

const Guild = Schema({

    id: String,
    money: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    bombs: { type: Number, default: 0 },
    shields: { type: Number, default: 0 },
    maxSpace: { type: Number, default: 1500 },
    pet: { type: Object, default: {} },
    cacheName: { type: String, default: '' },
    food: { type: Number, default: 0 },
    items: { type: Array, default: [] }

})
module.exports = model('Economy', Guild)