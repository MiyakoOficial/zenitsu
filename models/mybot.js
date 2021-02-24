const { Schema, model } = require("mongoose")

const mybo = Schema({
    id: String,
    profile: String
});

module.exports = model('mybot', mybo)