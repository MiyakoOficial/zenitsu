//Después de Alias es opcional.
const Discord = require('discord.js');

module.exports = {
    config: {
        name: "search", //nombre del cmd
        alias: ['google'], //Alias
        description: "Buscar cosas en google", //Descripción (OPCIONAL)
        usage: "z!google cosa a buscar",
        category: 'utiles'
    },
    run: async ({ client, message, args, embedResponse }) => {

        let f = args;

        if (!f[0])
            return embedResponse('Que quieres buscar?')

        const googleIT = require('google-it');
        let results = await googleIT({ disableConsole: true, query: f.join(' ') }).catch(() => { })

        if (!results || !results[0])
            return embedResponse('Sin resultados');

        let embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor(client.color)

        results.forEach(r => {

            embed.addField(`\u200b[${r.title}](${r.link})`, '\u200b' + r.snippet)

        });

        return message.channel.send({ embed: embed }).catch(() => { })

    }
}