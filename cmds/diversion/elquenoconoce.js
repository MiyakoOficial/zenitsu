const Canvas = require('canvas');
const Discord = require("discord.js")

module.exports = {
    config: {
        name: "elquenoconoce", //nombre del cmd
        alias: [], //Alias
        description: "Meme de el que no conoce a dios a cualquier santo le reza", //Descripción (OPCIONAL)
        usage: "z!elquenoconoce @mencion",
        category: 'utiles',
        botPermissions: [],
        memberPermissions: []
    },
    run: async ({ message, args, embedResponse }) => {

        let userAvatar = message.author.displayAvatarURL({ dynamic: true, size: 2048 });

        let user = message.mentions.users.first() || null;

        if (!user)
            embedResponse('<:cancel:779536630041280522> | Debes de mencionar a un usuario.')

        const avatares = [userAvatar, user.displayAvatarURL({ format: 'png', size: 4096 })];

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