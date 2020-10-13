const Discord = require('discord.js');
module.exports = {
    config: {
        name: "challenge",//Nombre del cmd
        alias: [], //Alias
        description: "Manda una imagen con el reto cumplido", //Descripción (OPCIONAL)
        usage: "z!challenge texto",
        category: 'diversion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/challenge?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(client.color)
            .setTimestamp()
        return message.channel.send({ embed: embed })
    }
}