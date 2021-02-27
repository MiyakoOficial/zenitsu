// eslint-disable-next-line no-unused-vars
const { Message, MessageAttachment, MessageEmbed } = require("discord.js")

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "imageresize"
        this.alias = ['imgresize']
        this.category = 'utiles'
    }

    /**
     * 
     * @param {Object} param0
     * @param {Message} param0.message
     * @param {Array<String>} param0.args
     */


    async run({ message, args, client, embedResponse }) {

        let att = message.attachments.first();

        if (
            !att || !att.proxyURL
            || !(await require('image-url-validator')(att.proxyURL))
        )
            return embedResponse('<:cancel:804368628861763664> | Necesitas adjuntar un archivo.')

        let numerito = parseInt(args[0]);

        if (!numerito) return embedResponse(`<:cancel:804368628861763664> | ${numerito == 0 ? 'Numero invalido' : 'Necesita ser un numero'}.`)

        let { width, height } = att
        const Canvas = require('canvas')

        if (isNegative(numerito)) {
            let restar = numerito
            const canvas2 = Canvas.createCanvas(width + restar, height + restar),
                ctx2 = canvas2.getContext('2d'),
                image2 = await Canvas.loadImage(att.proxyURL)
            ctx2.drawImage(image2, 0, 0, width + restar, height + restar);

            let embed = new MessageEmbed()
                .attachFiles(new MessageAttachment(canvas2.toBuffer(), 'img.png'))
                .setImage('attachment://img.png')
                .setColor(client.color)
                .setTimestamp()
                .setFooter(`width actual: ${width + restar} height actual: ${height + restar}`)

            return message.channel.send({ embed }).catch(message.channel.send)
        }

        else {

            let sumar = numerito
            const canvas = Canvas.createCanvas(width + sumar, height + sumar),
                ctx = canvas.getContext('2d'),
                image = await Canvas.loadImage(att.proxyURL)
            ctx.drawImage(image, 0, 0, width + sumar, height + sumar);

            let embed = new MessageEmbed()
                .attachFiles(new MessageAttachment(canvas.toBuffer(), 'img.png'))
                .setImage('attachment://img.png')
                .setColor(client.color)
                .setTimestamp()
                .setFooter(`width actual: ${width + sumar} height actual: ${height + sumar}`)

            return message.channel.send({ embed }).catch(message.channel.send)
        }
    }
}
/**
 * 
 * @param {Number} num
 * @returns {Boolean}
 */
function isNegative(num) {
    if (isNaN(num)) throw new Error('Invalid number.');
    return num < 0
}