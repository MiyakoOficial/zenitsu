// eslint-disable-next-line no-unused-vars
const { Message, MessageAttachment, MessageEmbed } = require("discord.js")

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

        let numerito = parseInt(args[0]),
            segundonumerito = parseInt(args[1]),
            bufferEnd = null;

        //NORMAL

        if (!isNaN(numerito)) {

            const buffer = await (await require('node-fetch')(att.proxyURL)).buffer();

            if (require('is-gif')(buffer)) {

                if (!numerito)
                    return embedResponse(`<:cancel:804368628861763664> | ${message.guild.cachePrefix}imgresize <positive number>`);

                if (isNegative(numerito))
                    return embedResponse(`<:cancel:804368628861763664> | ${message.guild.cachePrefix}imgresize <positive number>`);

                if (numerito > 2700)
                    return embedResponse(`<:cancel:804368628861763664> | El tamaño máximo es 2700.`);

                const gumlet = require("@gumlet/gif-resize")
                bufferEnd = await gumlet({ height: numerito })(buffer);

                let embed = new MessageEmbed()
                    .attachFiles(new MessageAttachment(bufferEnd, att.name))
                    .setImage('attachment://' + att.name)
                    .setColor(client.color)
                    .setTimestamp()
                    .setFooter(`width actual: ?¿ height actual: ${numerito}`);

                return message.channel.send({ embed });

            }

            else {

                if (!numerito || !segundonumerito)
                    return embedResponse(`<:cancel:804368628861763664> | ${message.guild.cachePrefix}imgresize <positive number> <positive number>.`);

                if (isNegative(numerito) || isNegative(segundonumerito))
                    return embedResponse(`<:cancel:804368628861763664> | ${message.guild.cachePrefix}imgresize <positive number> <positive number>.`);

                if (numerito > 2700 || segundonumerito > 2700)
                    return embedResponse(`<:cancel:804368628861763664> | El tamaño máximo es 2700x2700.`);

                const Canvas = require('canvas');

                const canvas = Canvas.createCanvas(numerito, segundonumerito),
                    ctx = canvas.getContext('2d'),
                    image = await Canvas.loadImage(att.proxyURL);

                ctx.drawImage(image, 0, 0, numerito, segundonumerito);

                bufferEnd = canvas.toBuffer();

                let embed = new MessageEmbed()
                    .attachFiles(new MessageAttachment(bufferEnd, att.name))
                    .setImage('attachment://' + att.name)
                    .setColor(client.color)
                    .setTimestamp()
                    .setFooter(`width actual: ${numerito} height actual: ${segundonumerito}`);

                return message.channel.send({ embed });

            }

        }

        //BIG

        else if (args[0] == 'big') {

            const buffer = await (await require('node-fetch')(att.proxyURL)).buffer();

            if (require('is-gif')(buffer)) {

                if ((width + 100) > 2700 || (height + 100) > 2700)
                    return embedResponse(`<:cancel:804368628861763664> | No puedo poner más grande el gif...`);

                const gumlet = require("@gumlet/gif-resize")
                bufferEnd = await gumlet({ height: height + 100 })(buffer);

                let embed = new MessageEmbed()
                    .attachFiles(new MessageAttachment(bufferEnd, att.name))
                    .setImage('attachment://' + att.name)
                    .setColor(client.color)
                    .setTimestamp()
                    .setFooter(`width actual: ?¿ height actual: ${height + 100}`);

                return message.channel.send({ embed });

            }

            else {


                if ((width + 100) > 2700 || (height + 100) > 2700)
                    return embedResponse(`<:cancel:804368628861763664> | No puedo poner más grande la imagen...`);

                const Canvas = require('canvas');

                const canvas = Canvas.createCanvas(width + 100, height + 100),
                    ctx = canvas.getContext('2d'),
                    image = await Canvas.loadImage(att.proxyURL);

                ctx.drawImage(image, 0, 0, width + 100, height + 100);

                bufferEnd = canvas.toBuffer();

                let embed = new MessageEmbed()
                    .attachFiles(new MessageAttachment(bufferEnd, att.name))
                    .setImage('attachment://' + att.name)
                    .setColor(client.color)
                    .setTimestamp()
                    .setFooter(`width actual: ${width} to ${width + 100} height actual: ${height} to ${height + 100}`);

                return message.channel.send({ embed });

            }
        }

        //SMALL

        else if (args[0] == 'small') {

            const buffer = await (await require('node-fetch')(att.proxyURL)).buffer();

            if (require('is-gif')(buffer)) {

                if ((width - 100) <= 0 || (height - 100) <= 0)
                    return embedResponse(`<:cancel:804368628861763664> | No puedo poner más pequeño el gif...`);

                const gifFrames = require('gif-frames'),
                    GIFEncoder = require('gifencoder'),
                    Canvas = require('canvas'),
                    canvas = Canvas.createCanvas(width - 100, height - 100),
                    ctx = canvas.getContext('2d'),
                    image = await Canvas.loadImage(att.proxyURL),
                    gifInfo = require('gif-info');

                const { images } = (new gifInfo(toArrayBuffer(buffer)))


                const encoder = new GIFEncoder(width - 100, height - 100);
                encoder.setRepeat(0);
                encoder.setDelay(55);
                encoder.start();
                const stream = encoder.createReadStream();

                gifFrames({ url: att.proxyURL, frames: 'all' })
                    .then(async (frameData) => {

                        let i = 0;
                        for (let frame of frameData) {
                            let image = await Canvas.loadImage(frame.getImage()._obj);
                            ctx.drawImage(image, 0, 0, 100, 500)
                            encoder.setDelay(images[i].delay)
                            i++
                            encoder.addFrame(ctx)
                        }

                        encoder.finish();

                        bufferEnd = await require('util').promisify(toBuffer)(stream)

                        let embed = new MessageEmbed()
                            .attachFiles(new MessageAttachment(bufferEnd, att.name))
                            .setImage('attachment://' + att.name)
                            .setColor(client.color)
                            .setTimestamp()
                            .setFooter(`width actual: ?¿ height actual: ${height - 100}`);

                        return message.channel.send({ embed });

                    });

            }

            else {

                if ((width - 100) <= 0 || (height - 100) <= 0)
                    return embedResponse(`<:cancel:804368628861763664> | No puedo poner más pequeña la imagen...`);

                const Canvas = require('canvas');

                const canvas = Canvas.createCanvas(width - 100, height - 100),
                    ctx = canvas.getContext('2d'),
                    image = await Canvas.loadImage(att.proxyURL);

                ctx.drawImage(image, 0, 0, width - 100, height - 100);

                bufferEnd = canvas.toBuffer();

                let embed = new MessageEmbed()
                    .attachFiles(new MessageAttachment(bufferEnd, att.name))
                    .setImage('attachment://' + att.name)
                    .setColor(client.color)
                    .setTimestamp()
                    .setFooter(`width actual: ${width} to ${width - 100} height actual: ${height} to ${height - 100}`);

                return message.channel.send({ embed });

            }
        }

        else {

            let embed = new MessageEmbed()
                .setColor(client.color)
                .setTimestamp()
                .setDescription(`<:angery:804368531415629875> | Para poder usar el comando necesitas especificar el tamaño...`)
                .addField('Poner más grande la imagen', `${message.guild.cachePrefix}imgresize big ||100 pixeles mas 🔺||`)
                .addField('Poner más pequeña la imagen', `${message.guild.cachePrefix}imgresize small ||100 pixeles menos 🔻||`)
                .addField('Poner más grande/pequeña la imagen', `${message.guild.cachePrefix}imgresize <ancho> <altura> ||Limite 2700x2700 🔺🔻||`)
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