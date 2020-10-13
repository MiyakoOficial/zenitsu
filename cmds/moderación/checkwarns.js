const Discord = require('discord.js');

module.exports = {
    config: {
        name: "checkwarns",//Nombre del cmd
        alias: [], //Alias
        description: "Revisar el numero advertencias", //Descripción (OPCIONAL)
        usage: "z!checkwarns @mencion",
        category: 'moderacion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!message.mentions.members.first()) return embedResponse('Menciona a un miembro del servidor!')

        let miembro = message.mentions.users.first();

        let data = (await client.getData({ id: `${message.guild.id}_${message.mentions.users.first().id}` }, 'warns'))

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('<a:alarma:764931865676218380> Advertencias del miembro <a:alarma:764931865676218380>', miembro.displayAvatarURL({ dynamic: true }))
            .addField('Razón', !data || !data.razon ? 'No especificada!' : data.razon.slice(0, 1024))
            .addField('Advertencias totales', !data.warns ? 0 : data.warn)

        return message.channel.send({ embed: embed }).catch(e => { })

        //embedResponse(`Tiene ${!data.warns ? 0 : data.warns} advertencias\n\nUltima razón: ${!data.razon ? 'No especificada!' : data.razon}`)

    }
}