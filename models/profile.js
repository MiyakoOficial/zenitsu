const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: String,

    description: {
        type: String,
        default: 'No establecido.'
    },

    insignias: {
        type: Array,
        default: []
    },

    img: {
        type: String,
        default: 'https://cdn.discordapp.com/attachments/758009020526362715/766329070035402763/kimetsu-no-yaiba-romance-tanjiro-kanao.png'
    },

    thumbnail: {
        type: String,
        default: 'https://cdn.discordapp.com/attachments/758009020526362715/766329070035402763/kimetsu-no-yaiba-romance-tanjiro-kanao.png'
    },

    nick: {
        type: String,
        default: 'No establecido.'
    }

})
module.exports = model('profile', Guild)