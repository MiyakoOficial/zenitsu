const Discord = require('discord.js');
module.exports = {
    config: {
        name: "achievement", //nombre del cmd
        alias: [], //Alias
        description: "Manda una imagen con el logro cumplido", //Descripción (OPCIONAL)
        usage: "z!achievement texto",
        category: 'diversion',
        botPermissions: [],
        memberPermissions: []


    }, run: ({ client, message, args, embedResponse }) => {

        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/achievement?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(client.color)
            .setTimestamp()
        return message.channel.send({ embed: embed })
    }
}