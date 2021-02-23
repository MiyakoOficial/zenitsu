const Discord = require('discord.js');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "discordstatus"
        this.category = 'utiles'
    }
    async run({ message }) {
        const url = `https://discordstatus.com`;
        const data = await (await require('node-fetch')(url)).text()
        const Canvas = require('canvas'),
            canvas = Canvas.createCanvas(445, 60 * 5),
            ctx = canvas.getContext('2d')
        const texts = {
            '1': 'API',
            '2': 'Media Proxy',
            '3': 'Push Notifications',
            '4': 'Search',
        };
        for (let n of [1, 2, 3, 4]) {
            let array = data.split(`<svg class="availability-time-line-graphic"`)[n].split('</svg>')[0].split('x="').map(e => e.split('"')[0]).filter(e => !isNaN(e)),
                colores = data.split(`<svg class="availability-time-line-graphic" id="uptime-component-`)[n].split('</svg>')[0].split('fill="').map(a => a.split('"')[0]).slice(1)
            ctx.fillStyle = '#ffffff'
            ctx.fillText(texts[n], 5, (n * 60) - 5)
            for (let i in array) {
                ctx.fillStyle = colores[i]
                ctx.fillRect(array[i], n * 60, 3, 34)
            }
        }
        let att = new Discord.MessageAttachment(canvas.toBuffer(), 'img.png');
        let embed = new Discord.MessageEmbed()
            .setColor(message.client.color)
            .setTimestamp()
            .attachFiles(att)
            .setImage('attachment://img.png')
            .setAuthor('Discord Status', 'https://cdn.discordapp.com/attachments/649043690765025352/813915354010222642/750851146884710541.png', 'https://discordstatus.com/')

        return message.channel.send({ embed })
    }
}