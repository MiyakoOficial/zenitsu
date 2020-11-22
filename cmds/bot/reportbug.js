const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "reportbug",
        alias: [],
        description: "reportar algun bot del bot",
        usage: "z!reportbug bug ocurrido",
        category: 'bot'
    },
    run: ({ client, message, args, embedResponse }) => {

        if (!args[0]) return embedResponse('<:cancel:779536630041280522> | Necesitas especificar el error/bug.')
        let embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`[📢] | ${args.join(' ')}`)
            .setTimestamp()
            .setAuthor(`${message.author.tag}(${message.author.id})`)
            .setFooter('Enviado desde ' + message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return client.channels.cache.get('725053091522805787').send({ embed: embed }).then(() => {
            return embedResponse('📢 | Reporte enviado!');
        })
    }
}