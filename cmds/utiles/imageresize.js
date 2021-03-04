// eslint-disable-next-line no-unused-vars
const { Message, MessageAttachment, MessageEmbed, Util, TextChannel } = require("discord.js")

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "imageresize"
        this.alias = ['imgresize']
        this.category = 'utiles'
        this.cooldown = 60;
    }

    /**
     * 
     * @param {Object} param0
     * @param {Message} param0.message
     * @param {Array<String>} param0.args
     * @param {function(String): Promise<Message>} param0.embedResponse
     */


    async run({ message, args, client, embedResponse }) {

        let att = message.attachments.first();

        let validate = require('image-url-validator').default,
            at = await validate(att?.proxyURL || 'askdakd'),
            argsito = await validate(args[2] || 'adkao')

        if (!(at) && !(argsito))
            return embedResponse('<:cancel:804368628861763664> | Necesitas adjuntar un archivo.');

        const url = (at ? att.proxyURL : argsito ? args[2] : null)

        const numerito = parseInt(args[0]),
            segundonumerito = parseInt(args[1])

        if (!isNaN(numerito) && !isNaN(segundonumerito)) {

            if (numerito > 1000 || segundonumerito > 1000)
                return embedResponse(`<:cancel:804368628861763664> | El tamaño máximo es 1000x1000.`);

            if (isNegative(numerito) || isNegative(segundonumerito))
                return embedResponse(`<:cancel:804368628861763664> | El tamaño máximo es 1000x1000, pero positivos <:_XD:599689626835484672>.`);

            let attachment = await resizeImage(url, numerito, segundonumerito, message.channel)

            let embed = new MessageEmbed()
                .attachFiles([attachment])
                .setImage(`attachment://${attachment.name}`)
                .setColor(client.color)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

            return message.channel.send({ content: `${message.member}`, embed });

        }

        else {

            let embed = new MessageEmbed()
                .setTimestamp()
                .setColor(client.color)
                .setDescription()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Para poder modificar un gif necesitas espeficicar la altura y el ancho`)
                .addField('Ejemplo', `${message.guild.cachePrefix}imgresize 50 150 [url/attachment]`)

            return message.channel.send({ embed });

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
    return num < 0;
}
/**
 * 
 * @param {String} link 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Boolean} isGif
 * @param {TextChannel} channel
 * @returns {Promise<MessageAttachment>}
 */

async function resizeImage(link = 'https://', width = 50, height = 50, channel) {

    const sharp = require('sharp');

    /**@type {Buffer} */
    const buffer = await require('node-fetch')(link).then(esto => esto.buffer())

    if (require('is-gif')(buffer)) {

        channel.send('<:wearymonke:816652946418827284> | Espere un momento...')

        const { resizeGif } = require('../../Utils/Functions');

        const res = await resizeGif({ width, height, stretch: true })(buffer)

        let att = new MessageAttachment(res, 'file.gif');

        return att;

    } else {

        const bufferSharp = await sharp(buffer)
            .resize({
                width,
                height,
                fit: `fill`,
            })
            .toBuffer();

        return new MessageAttachment(bufferSharp, 'file.png')

    }


}