const { Schema, model } = require('mongoose');

const test = Schema({
    id: String,
    test: Array
})

module.exports = model('tests', test)