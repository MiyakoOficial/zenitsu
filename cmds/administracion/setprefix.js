const { MessageEmbed } = require('discord.js');
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "setprefix", //nombre del cmd
        alias: [], //Alias
        description: "Establecer el nuevo prefix", //Descripción (OPCIONAL)
        usage: "z!setprefix prefix",
        category: 'administracion',
        botPermissions: [],
        memberPermissions: ['ADMINISTRATOR']
    }, run: ({ client, message, args }) => {

        let embedErr = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`<:cancel:779536630041280522> | Necesitas especificar el prefijo nuevo.`)
            .setTimestamp()

        if (!args[0])
            return message.channel.send({ embed: embedErr })

        let embedE = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`<:cancel:779536630041280522> | El prefix debe tener menos de 3 caracteres.`)
            .setTimestamp()

        if (!args[0].length >= 4)
            return message.channel.send({ embed: embedE })

        return client.updateData({ id: message.guild.id }, { prefix: args[0] }, 'prefix').then(data => {

            let embed = new MessageEmbed()
                .setColor(client.color)
                .setDescription(`<:moderator:779536592431087619> | ${message.author.username} ha establecido el prefijo a: ${data.prefix}`)
                .setTimestamp()

            return message.channel.send({ embed: embed })

        }).catch(err => {

            let embed = new MessageEmbed()
                .setColor(client.color)
                .setDescription(`<:cancel:779536630041280522> | Error al establecer el prefijo.`)
                .setTimestamp()
                .setFooter(err)

            return message.channel.send({ embed: embed })

        })
    }
}