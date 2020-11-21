const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "unblockchannel", //nombre del cmd
        alias: [], //Alias
        description: "Desbloquea el canal para los miembros.", //Descripción (OPCIONAL)
        usage: "z!unblockchannel",
        category: 'administracion',
        botPermissions: ['MANAGE_CHANNELS'],
        memberPermissions: ['MANAGE_CHANNELS']
    },
    run: ({ message, client }) => {
        if (message.author.id != '507367752391196682')
            return;
        return message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {

            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(`<:trustedAdmin:779695112036286474> | ${message.author.username} ha desbloqueado el canal para los miembros.`)
                .setTimestamp()
            return message.channel.send({ embed: embed })

        }).catch(err => {

            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(`<:cancel:779536630041280522> | Error al intentar desbloquear el canal.`)
                .setTimestamp()
                .setFooter(err)
            return message.channel.send({ embed: embed })

        })
    }
}