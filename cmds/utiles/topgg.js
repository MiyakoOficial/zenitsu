const { MessageEmbed } = require('discord.js');
const { topGG } = require('myscrapper');

module.exports = {
    config: {
        name: 'topgg',
        alias: [],
        usage: 'topgg <bot name | category>',
        description: 'Informacion sobre top.gg/',
        botPermissions: [],
        memberPermissions: [],
    },
    run: async ({ client, args, message, embedResponse }) => {

        if (!args[0])
            return embedResponse('¿Que quieres buscar?');

        let data = await topGG(args.join(' ')) || [];

        if (!data || !data[0])
            return embedResponse('Sin resultados.')

        data = data[0]

        let types = {
            bot: 'bot',
            guild: 'servidor'
        }

        let embed = new MessageEmbed()
            .setColor(client.color)
            .addField('Nombre', data.name, true)
            .addField('ID', data.id, true)
            .addField('Tipo', types[data.type], true)

        if (data.invite)
            embed.addField('Invitacion', `[Dame click!](${data.invite})`, true)

        embed = embed
            .addField('Descripcion', data.description, true)
            .addField('Tags', data.tags.join(', '))
            .setThumbnail(data.icon)
            .setTimestamp()

        return message.channel.send({ embed: embed })

    }

}