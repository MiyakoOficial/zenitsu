const Canvas = require('canvas');
const Discord = require("discord.js")

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "elquenoconoce"
        this.category = 'diversion'
    }

    async run({ message, args, embedResponse }) {

        let userAvatar = message.author.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' });

        let user = message.mentions.users.first() || null;

        if (!user)
            return embedResponse('<:cancel:804368628861763664> | Debes de mencionar a un usuario.')

        const avatares = [userAvatar, user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true })];

        if (args.join(' ').toLowerCase().endsWith(' --reverse')) avatares.reverse();
        const canvas = Canvas.createCanvas(908, 920);
        const cxt = canvas.getContext('2d');

        cxt.fillStyle = '#ffffff';
        cxt.fillRect(0, 0, 908, 920);

        cxt.fillStyle = '#000000';
        cxt.font = '50px arial';
        cxt.alignText = 'center';
        cxt.fillText('El que no conoce a Dios', 160, 100);

        cxt.strokeStyle = '#000000';
        cxt.lineWidth = 3;
        cxt.strokeRect(120, 150, 650, 320);

        const firstAvatar = await Canvas.loadImage(avatares[0]);
        cxt.drawImage(firstAvatar, 120, 150, 650, 320);

        cxt.fillStyle = '#000000';
        cxt.font = '50px arial';
        cxt.alignText = 'center';
        cxt.fillText('A cualquier santo le reza', 160, 520);

        cxt.strokeStyle = '#000000';
        cxt.lineWidth = 3;
        cxt.strokeRect(120, 550, 650, 320);

        const lastAvatar = await Canvas.loadImage(avatares[1]);
        cxt.drawImage(lastAvatar, 120, 550, 650, 320);

        const image = new Discord.MessageAttachment(canvas.toBuffer(), 'meme.png');
        message.channel.send(image);
    }
}