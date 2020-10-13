const Discord = require("discord.js")

module.exports = {
    config: {
        name: "suggest",
        alias: [],
        description: "sugerir un comando/cambio en el bot",
        usage: "z!suggest sugerencia",
        category: 'bot'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {
        if (!args[0]) return embedResponse('Escribe algo!')
        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .addField(message.author.tag, args.join(' '))
        client.channels.cache.get('727948582556270682').send({ embed: embed })
        return embedResponse('Sugerencia enviada!');
    }
}