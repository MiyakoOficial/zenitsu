const Discord = require("discord.js")

module.exports = {
    config: {
        name: "suggest",
        alias: [],
        description: "sugerir un comando/cambio en el bot",
        usage: "z!suggest sugerencia",
        category: 'bot',
        botPermissions: [],
        memberPermissions: []
    },
    run: ({ client, message, args, embedResponse }) => {

        if (!args[0]) return embedResponse('<:cancel:779536630041280522> | Necesitas especificar la sugerencia.')
        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`[<:reason2:779695137205911552>] | ${args.join(' ')}`)
            .setTimestamp()
            .setAuthor(`${message.author.tag}(${message.author.id})`)
            .setFooter('Enviado desde ' + message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return client.channels.cache.get('727948582556270682').send({ embed: embed }).then(() => {
            return embedResponse('<:reason2:779695137205911552> | Sugerencia enviado!');
        })
    }
}