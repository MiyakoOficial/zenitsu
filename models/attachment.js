const { MessageAttachment } = require('discord.js');
const { Schema, model } = require('mongoose');

const Guild = Schema({

    mapa: Array,
    Attachment: Object

});
module.exports = model('attachment', Guild);