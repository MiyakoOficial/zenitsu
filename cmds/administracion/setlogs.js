const { MessageEmbed } = require("discord.js");

//Después de Alias es opcional.
module.exports = {
    config: {
        name: "setlogs", //nombre del cmd
        alias: [], //Alias
        description: "Establecer el canal de logs", //Descripción (OPCIONAL)
        usage: "z!setlogs #canal",
        category: 'administracion',
        botPermissions: [],
        memberPermissions: ['ADMINISTRATOR']

    },
    run: ({ client, message, embedResponse }) => {

        let channel = message.mentions.channels.first();
        let embedErr = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`<:cancel:779536630041280522> | No has mencionado un canal.`)
            .setTimestamp()

        if (!channel) return message.channel.send({ embed: embedErr })

        let embedE = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`<:cancel:779536630041280522> | No tengo permisos para enviar mensajes en el canal mencionado.`)
            .setTimestamp()

        if (!channel.permissionsFor(client.user).has(`SEND_MESSAGES`))
            return message.channel.send({ embed: embedE })

        return client.updateData({ id: message.guild.id }, { channellogs: channel.id }, 'logs').then(data => {

            let embed = new MessageEmbed()
                .setColor(client.color)
                .setDescription(`<: moderator: 779536592431087619 > | ${message.author.username} ha establecido el canal de logs en: <#${data.channellogs}>`)
                .setTimestamp()

            return message.channel.send({ embed: embed })

        }).catch(err => {

            let embed = new MessageEmbed()
                .setColor(client.color)
                .setDescription(`<:cancel:779536630041280522> | Error al establecer el canal de logs.`)
                .setTimestamp()
                .setFooter(err)

            return message.channel.send({ embed: embed })

        })
    }
}