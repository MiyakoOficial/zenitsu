const Discord = require('discord.js');

module.exports = {
    config: {
        name: "warn",//Nombre del cmd
        alias: [], //Alias
        description: "Advertir a un miembro", //Descripción (OPCIONAL)
        usage: "z!warn @mencion razon(opcional)",
        category: 'moderacion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) return embedResponse('No tienes el permiso `KICK_MEMBERS`')
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return embedResponse('No tengo el permiso `KICK_MEMBERS`')

        let miembro = message.mentions.members.first();

        let razon = args.slice(1).join(' ') || 'No especificada';

        if (!miembro) return embedResponse('Menciona a un miembro del servidor!')

        if (miembro.user.bot) return embedResponse('No puedes advertir a un bot.');

        if (miembro.roles.highest.comparePositionTo(message.member.roles.highest) > 0)
            return embedResponse('No puedes advertir a este usuario.')

        if (!miembro.kickable)
            return embedResponse('No puedo advertir a este usuario.')

        if (!args[0].match(/\<\@(\!)?[0-9]{18}\>/g)) return embedResponse('La mencion tiene que ser el primer argumento!')

        if (miembro.hasPermission('ADMINISTRATOR'))
            return embedResponse('El miembro mencionado es administrador.')

        miembro = miembro.user;

        if (miembro.id == message.author.id) return embedResponse('No te puedes advertir a ti mismo.')

        let data = (await client.updateData({ idGuild: message.guild.id, idMember: miembro.id }, { $push: { warns: { razon: razon, fecha: Hora(Date.now(), true), mod: message.author.tag } } }, 'warns'));

        let check = (await client.getData({ id: message.guild.id }, 'settings')).warnsParaKickear;
        //embedResponse(`El miembro fue advertido!\nAhora tiene: ${data.warns} advertencias.\n\nRazón: ${razon}.`)

        if (data.warns.length >= check)

            if (message.mentions.members.first().kickable) message.mentions.members.first().kick(razon)

                .then(async (a) => {
                    embedResponse('Miembro expulsado').catch(e => { })
                    await require('../../models/warns.js').deleteOne({ idGuild: message.guild.id, idMember: member.id });
                })

                .catch(er => {
                    embedResponse('Error en expulsar el miembro!').catch(e => { })
                })

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('<a:alarma:767497168381935638> Miembro advertido <a:alarma:767497168381935638>')
            .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
            .addField('Razón', razon.slice(0, 1024), true)
            .addField('Moderador', message.author.tag, true)
            .addField('\u200b', '\u200b', true)
            .addField('Advertencias totales', data.warns.length, true)
            .addField('Advertencias para ser expulsado', check, true)

        return message.channel.send({ embed: embed }).catch(a => { });
    }
}