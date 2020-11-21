const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "blockchannel", //nombre del cmd
        alias: [], //Alias
        description: "Editar todos los canales(maximo 100)", //Descripción (OPCIONAL)
        usage: "z!editchannels @mencion",
        category: 'administracion',
        botPermissions: ['MANAGE_CHANNELS'],
        memberPermissions: ['MANAGE_CHANNELS']
    },
    run: ({ message, client }) => {
        if (message.author.id != '507367752391196682')
            return;
        return message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(`<:trustedAdmin:779695112036286474> | ${message.author.username} ha bloqueado el canal para los miembros.`)
                .setTimestamp()
            return message.channel.send({ embed: embed })
        }).catch(err => {

            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(`<:cancel:779536630041280522> | Error al intentar bloquear el canal.`)
                .setTimestamp()
                .setFooter(err)
            return message.channel.send({ embed: embed })

        })
    }
}