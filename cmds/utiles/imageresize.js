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
        this.dev = true
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

            let attachment = await resizeImage(url, numerito, segundonumerito, message.channel, message.author.id)

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
/*
function toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}*/

/**
 * 
 * @param {String} link 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Boolean} isGif
 * @param {TextChannel} channel
 * @param {String} id
 * @returns {Promise<MessageAttachment>}
 */

async function resizeImage(link = 'https://', width = 50, height = 50, channel = null, id = 'no-id') {

    const sharp = require('sharp');

    /**@type {Buffer} */
    const buffer = await require('node-fetch')(link).then(esto => esto.buffer())

    if (require('is-gif')(buffer)) {

        channel.send(`<:wearymonke:816652946418827284> | Cargando el gif...`).catch(() => { });

        await createFrames({
            input: link,
            output: id + '-frame-%d.png',
        })

        await Util.delayFor(2000)
        const frames = await loadFrames(id)
        const gifencoder = require('gifencoder');

        const encoder = new gifencoder(100, 100)
        encoder.start();
        encoder.setRepeat(1);
        encoder.setQuality(10);
        encoder.setDelay(55);
        const canvas = require('canvas').createCanvas(100, 100);
        const ctx = canvas.getContext('2d');
        const gifFrames = require('gif-frames')
        const stream = encoder.createReadStream();

        let gifframes = await gifFrames(
            {
                url: link,
                frames: 'all',
                cumulative: false
            }
        )
        let i = 0;
        for (let img of frames) {

            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, 100, 100)
            ctx.drawImage(img, 0, 0, 100, 100)
            encoder.setDelay(gifframes[i].frameInfo.delay * 10)
            encoder.addFrame(ctx)
            i++

        }
        encoder.finish();
        let buffer = await require('util').promisify(toBuffer)(stream),
            att = new MessageAttachment(buffer, 'file.gif');

        return att;

    } else {

        const bufferSharp = await sharp(buffer)
            .resize(width, height)
            .toBuffer();

        return new MessageAttachment(bufferSharp, 'file.png')

    }


}

/*
    copi pasteado pq si
*/

const fs = require('fs')
const path = require('path')
const pify = require('pify')
const pump = require('pump-promise')
const getPixels = pify(require('get-pixels'))
const savePixels = require('save-pixels')
const { loadImage } = require('canvas')

const supportedFormats = new Set([
    'jpg',
    'png',
    'gif'
])

async function createFrames(opts) {
    const {
        input,
        output,
        coalesce = true
    } = opts

    const format = output
        ? path.extname(output).substr(1)
        : undefined

    if (format && !supportedFormats.has(format)) {
        throw new Error(`invalid output format "${format}"`)
    }

    const results = await getPixels(input)
    const { shape } = results

    if (shape.length === 4) {
        // animated gif with multiple frames
        const [
            frames,
            width,
            height,
            channels
        ] = shape

        const numPixelsInFrame = width * height

        for (let i = 0; i < frames; ++i) {
            if (i > 0 && coalesce) {
                const currIndex = results.index(i, 0, 0, 0)
                const prevIndex = results.index(i - 1, 0, 0, 0)

                for (let j = 0; j < numPixelsInFrame; ++j) {
                    const curr = currIndex + j * channels

                    if (results.data[curr + channels - 1] === 0) {
                        const prev = prevIndex + j * channels

                        for (let k = 0; k < channels; ++k) {
                            results.data[curr + k] = results.data[prev + k]
                        }
                    }
                }
            }

            if (output) {
                await saveFrame(results.pick(i), format, output.replace('%d', i))
            }
        }
    } else if (output) {
        // non-animated gif with a single frame
        await saveFrame(results, format, output.replace('%d', 0))
    }

    return results
}

function saveFrame(data, format, filename) {
    const stream = savePixels(data, format)
    return pump(stream, fs.createWriteStream(`/home/MARCROCK22/zenitsu/Utils/temp/${filename}`))
}

async function loadFrames(id) {

    const frames = fs.readdirSync('/home/MARCROCK22/zenitsu/Utils/temp').filter(item => item.includes(id))
        .sort((a, b) => {
            let first = a.split('frame-')[1]?.split('.')[0],
                second = b.split('frame-')[1]?.split('.')[0]
            first = parseInt(first)
            second = parseInt(second)
            return first - second
        })

    const framesLoad = frames.map((img) => loadImage(`/home/MARCROCK22/zenitsu/Utils/temp/${img}`));

    const res = await Promise.all(framesLoad);

    for (let i of frames) {

        fs.unlinkSync(`/home/MARCROCK22/zenitsu/Utils/temp/${i}`);

    }

    return res;

}