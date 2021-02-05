/* eslint-disable no-unused-vars */
const { Message } = require('discord.js');
const { Client } = require('discord.js');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "porquelloras"
        this.alias = ['pqlloras', 'whyyoucry']
        this.category = 'diversion'
    }
    /**
     * @param {Object} obj
     * @param {Message} obj.message
     * @param {Client} obj.client
     */
    async run(obj) {
        const { message, client, embedResponse, args } = obj;
        const Canvas = require("canvas");
        const Discord = require('discord.js');
        const canvas = Canvas.createCanvas(834, 824)
        const ctx = canvas.getContext('2d')
        const bck = await Canvas.loadImage('https://cdn.discordapp.com/attachments/803346384144433154/806882490484391936/36b8a20b5ab437f21c2ad7aa7d2f99ca9122e652r1-729-720v2_uhq.jpg')
        ctx.drawImage(bck, 0, 0, 834, 824)
        let atte = message.attachments.find(item => require('is-image')(item.proxyURL))?.proxyURL
        let image =
            atte || (require('is-image')(args[0] ? args[0] : 'ARGS IS UNDEFINED') ? args[0] : null)
            || message.mentions.users.first()?.displayAvatarURL({ format: 'png' })
            || message.author.displayAvatarURL({ format: 'png' });
        image = await Canvas.loadImage(image)
        ctx.drawImage(image, 230, 125, 580, 475)

        const att = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png');

        message.channel.send({ files: [att] })


    }
}