const { MessageEmbed } = require("discord.js");

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "setchannelxp"
        this.category = 'niveles'
        this.memberPermissions.guild = ['ADMINISTRATOR']
    }
    run({ client, message, embedResponse }) {

        let channel = message.mentions.channels.first();
        if (!channel) return embedResponse("<:cancel:804368628861763664> | Necesitas mencionar el canal.")

        let embedE = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`<:cancel:804368628861763664> | No tengo permisos para enviar mensajes en el canal mencionado.`)
            .setTimestamp()

        if (!channel.permissionsFor(client.user).has(`SEND_MESSAGES`))
            return message.channel.send({ embed: embedE })

        return client.updateData({ id: message.guild.id }, { canal: channel.id }, 'logslevel')
            .then(data => {
                return embedResponse(`<:trustedAdmin:804368672520536104> | ${message.author.tag} establecio el canal en: <#${data.canal}>`)
            })
            .catch(e => {
                let embed = new MessageEmbed()
                    .setColor(client.color)
                    .setTimestamp()
                    .setDescription(`<:cancel:804368628861763664> | Error en establecer el canal.`)
                    .setFooter(e)
                return message.channel.send({ embed: embed })
            })
    }
}