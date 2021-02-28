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
            || !(await require('image-url-validator').default(att.proxyURL))
        )
            return embedResponse('<:cancel:804368628861763664> | Necesitas adjuntar un archivo.');

        let numerito = parseInt(args[0]),
            segundonumerito = parseInt(args[1]);

        if (!numerito || !segundonumerito)
            return embedResponse(`<:cancel:804368628861763664> | ${message.guild.cachePrefix}imgresize <positive number> <positive number>.`);

        if (isNegative(numerito) || isNegative(segundonumerito))
            return embedResponse(`<:cancel:804368628861763664> | ${message.guild.cachePrefix}imgresize <positive number> <positive number>.`);

        if (numerito > 2700 || segundonumerito > 2700)
            return embedResponse(`<:cancel:804368628861763664> | El tamaño máximo es 2700x2700.`);

        let bufferTest = await (await require('node-fetch')(att.proxyURL)).buffer(),
            bufferEnd = false;

        if (require('is-gif')(bufferTest, 0, 3)) {

            message.channel.send(`Cargando gif...`).catch(() => { })

            const gifFrames = require('gif-frames'),
                GIFEncoder = require('gifencoder')

            const encoder = new GIFEncoder(numerito, segundonumerito);
            encoder.setRepeat(0);
            encoder.setDelay(55);
            encoder.start();
            let stream = encoder.createReadStream();

            const Canvas = require('canvas'),
                canvas = Canvas.createCanvas(numerito, segundonumerito),
                ctx = canvas.getContext('2d');

            await gifFrames({ url: att.proxyURL, frames: 'all' }).then(async (frameData) => {

                for await (let frame of frameData) {
                    console.log(frame)
                    let image = await Canvas.loadImage(frame.getImage()._obj);
                    ctx.drawImage(image, 0, 0, numerito, segundonumerito)
                    encoder.addFrame(ctx)
                }

                encoder.finish();

            });

            let buffer = await require('util').promisify(toBuffer)(stream)
            bufferEnd = buffer;

        }

        else {

            const Canvas = require('canvas');

            const canvas = Canvas.createCanvas(numerito, segundonumerito),
                ctx = canvas.getContext('2d'),
                image = await Canvas.loadImage(att.proxyURL);

            ctx.drawImage(image, 0, 0, numerito, segundonumerito);

            bufferEnd = canvas.toBuffer();

        }

        let embed = new MessageEmbed()
            .attachFiles(new MessageAttachment(bufferEnd, att.name))
            .setImage('attachment://' + att.name)
            .setColor(client.color)
            .setTimestamp()
            .setFooter(`width actual: ${numerito} height actual: ${segundonumerito}`);

        return message.channel.send({ embed });

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