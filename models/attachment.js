const { Schema, model } = require('mongoose');

const Guild = Schema({

    mapa: String,
    Attachment: Object

});
module.exports = model('attachment', Guild);