const { MessageEmbed } = require('discord.js');
const { topGG } = require('myscrapper');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = 'topgg'
        this.category = 'utiles'
    }
    async run({ client, args, message, embedResponse }) {

        if (!args[0])
            return embedResponse('<:cancel:804368628861763664> | ¿Que quieres buscar?');

        await embedResponse('<:accept:804368642913206313> | Buscando: ' + args.join(' '))

        let { data } = await topGG(args.join(' '), 'true') || { data: [] };

        if (!data || !data[0])
            return embedResponse('<:cancel:804368628861763664> | Sin resultados.')

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
            .addField('Tags', data.tags ? data.tags.join(', ') : 'Sin tags.')
            .setThumbnail(data.icon)
            .setTimestamp()
        if (data.owners && data.owners[0]) {
            embed = embed.setAuthor(data.owners[0].name, data.owners[0].avatarURL)
        }
        embed = embed.setFooter(`Primer resultado de ${superdata.length}`)

        return message.channel.send({ embed: embed })

    }

}