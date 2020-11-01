const Discord = require('discord.js');

module.exports = {
    config: {
        name: "pardon",//Nombre del cmd
        alias: [], //Alias
        description: "Quita una advertencia a un miembro", //Descripción (OPCIONAL)
        usage: "z!pardon @mencion",
        category: 'moderacion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) return embedResponse('No tienes el permiso `KICK_MEMBERS`');

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Menciona a un miembro del servidor!')

        if (miembro.user.bot) return embedResponse('No puedes perdonar a un bot.');

        miembro = miembro.user;

        if (miembro.id == message.author.id) return embedResponse('No te puedes perdonar a ti mismo.')

        let datazo = (await client.getData({ idGuild: message.guild.id, idMember: miembro.id }, 'warns'));

        if (datazo.warns.length <= 0)
            return embedResponse('El miembro no tiene advertencia(s).')

        let data = (await client.updateData({ idGuild: message.guild.id, idMember: miembro.id }, { $pop: { warns: 1 } }, 'warns'));

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('Miembro perdonado')
            .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
            .setDescription('Ahora el miembro tiene ' + data.warns.length + ' advertencias.')
            .setFooter('Advertencia quitada por ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))


        return message.channel.send({ embed: embed }).catch(e => { });
    }
}