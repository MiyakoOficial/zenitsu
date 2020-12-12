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
            return embedResponse('<:cancel:779536630041280522> | ¿Que quieres buscar?');

        await embedResponse('<:accept:779536642365063189> | Buscando: ' + args.join(' '))

        let { data } = await topGG(args.join(' '), 'false') || { data: [] };

        if (!data || !data[0])
            return embedResponse('<:cancel:779536630041280522> | Sin resultados.')

        let superdata = data;
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
        if (data.owners && data.owners[0]) {
            embed = embed.setAuthor(data.owners[0].name, data.owners[0].avatarURL)
        }
        embed = embed.setFooter(`Primer resultado de ${superdata.length}`)

        return message.channel.send({ embed: embed })

    }

}