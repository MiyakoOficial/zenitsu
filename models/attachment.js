const { Schema, model } = require('mongoose');

const Guild = Schema({

    mapa: Array,
    Attachment: Object

});
module.exports = model('attachment', Guild);