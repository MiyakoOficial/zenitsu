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

    footer: {
        type: String,
        default: 'https://cdn.discordapp.com/attachments/758009020526362715/766329070035402763/kimetsu-no-yaiba-romance-tanjiro-kanao.png'
    },

    footertext: {
        type: String,
        default: 'No establecido.'
    },

    color: {
        type: String,
        default: '#E09E36'
    },

    nick: {
        type: String,
        default: 'No establecido.'
    },

    seguidores: {
        type: Array,
        default: []
    },

    likes: {
        type: Array,
        default: []
    }

})
module.exports = model('profile', Guild)