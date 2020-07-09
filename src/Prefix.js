const { Schema, model } = require('mongoose');

const Prefix = Schema({
    id: String,
    prefix: {
        default: 'z!',
        type: String
    },
})

module.exports = model('Prefix', Prefix)