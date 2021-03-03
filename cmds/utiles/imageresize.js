// eslint-disable-next-line no-unused-vars
const { Message, MessageAttachment, MessageEmbed, Util, TextChannel } = require("discord.js")

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "imageresize"
        this.alias = ['imgresize']
        this.category = 'utiles'
        this.cooldown = 20;
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

        if (
            !att || !att.proxyURL
            || !(await require('image-url-validator').default(att.proxyURL))
        )
            return embedResponse('<:cancel:804368628861763664> | Necesitas adjuntar un archivo.');

        const { width, height } = att;

        const numerito = parseInt(args[0]),
            segundonumerito = parseInt(args[1])

        if (!isNaN(numerito) && !isNaN(segundonumerito)) {

            if (numerito > 1350 || segundonumerito > 1350)
                return embedResponse(`<:cancel:804368628861763664> | El tamaño máximo es 1350x1350.`);

            if (isNegative(numerito) || isNegative(segundonumerito))
                return embedResponse(`<:cancel:804368628861763664> | El tamaño máximo es 1350x1350, pero positivos <:_XD:599689626835484672>.`);

            let attachment = await resizeImage(att.proxyURL, numerito, segundonumerito, message.channel)

            return message.channel.send(attachment);

        }

        else {

            let embed = new MessageEmbed()
                .setAuthor('En mantenimiento...')
                .setColor(client.color)
                .setTimestamp()
                .setDescription(`<:angery:804368531415629875> | Para poder usar el comando necesitas especificar el tamaño...`)
                .addField('Poner más grande la imagen', `${message.guild.cachePrefix}imgresize big ||100 pixeles mas 🔺||`)
                .addField('Poner más pequeña la imagen', `${message.guild.cachePrefix}imgresize small ||100 pixeles menos 🔻||`)
                .addField('Poner más grande/pequeña la imagen', `${message.guild.cachePrefix}imgresize <ancho> <altura> ||Limite 1350x1350 🔺🔻||`)
                .setFooter(`Si es un gif solo podras modificar la altura...`);

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
function toArray(stream, callback) {
    let arr = []

    stream.on('data', onData)
    stream.once('end', onEnd)
    stream.once('error', callback)
    stream.once('error', cleanup)
    stream.once('close', cleanup)

    function onData(doc) {
        arr.push(doc)
    }

    function onEnd() {
        callback(null, arr)
        cleanup()
    }

    function cleanup() {
        arr = null
        stream.removeListener('data', onData)
        stream.removeListener('end', onEnd)
        stream.removeListener('error', callback)
        stream.removeListener('error', cleanup)
        stream.removeListener('close', cleanup)
    }

    return stream
}

function toBuffer(stream, callback) {
    toArray(stream, function (err, arr) {
        if (err || !arr)
            callback(err)
        else
            callback(null, Buffer.concat(arr))
    })

    return stream
}

function toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
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

async function resizeImage(link = 'https://', width = 50, height = 50, channel = null) {

    const sharp = require('sharp');

    /**@type {Buffer} */
    const buffer = await require('node-fetch')(link).then(esto => esto.buffer())

    if (require('is-gif')(buffer)) {

        channel.send(`<:wearymonke:816652946418827284> | Cargando el gif...`).catch(() => { })

        const gifFrames = require('gif-frames'),
            GIFEncoder = require('gifencoder'),
            Canvas = require('canvas'),
            canvas = Canvas.createCanvas(width, height),
            ctx = canvas.getContext('2d')

        const encoder = new GIFEncoder(width, height);
        encoder.setRepeat(0);
        encoder.setDelay(55);
        encoder.start();
        const stream = encoder.createReadStream();

        return gifFrames({ url: link, frames: 'all' })
            .then(async (frameData) => {
                for (let frame of frameData) {
                    let image = await Canvas.loadImage(frame.getImage()._obj);
                    ctx.drawImage(image, 0, 0, width, height)
                    encoder.setDelay(frame.frameInfo.delay * 10)
                    encoder.addFrame(ctx)
                    await Util.delayFor(1500);
                }
                encoder.finish();
                return new MessageAttachment(await require('util').promisify(toBuffer)(stream), 'file.gif')
            });

    } else {

        const bufferSharp = await sharp(buffer)
            .resize(width, height)
            .toBuffer();

        return new MessageAttachment(bufferSharp, 'file.png')

    }


}