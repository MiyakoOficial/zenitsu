const Discord = require('discord.js');
module.exports = {
    config: {
        name: "captcha", //nombre del cmd
        alias: [], //Alias
        description: "Manda una imagen como si fuese el reto de captcha", //Descripción (OPCIONAL)
        usage: "z!captcha texto",
        category: 'diversion',
        botPermissions: [],
        memberPermissions: []


    }, run: ({ client, message, args, embedResponse }) => {

        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/captcha?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(client.color)
            .setTimestamp()
        return message.channel.send({ embed: embed })
    }
}