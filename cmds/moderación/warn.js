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

        if (miembro.roles.highest.comparePositionTo(message.member.roles.highest) > 0 || !miembro.kickable)
            return embedResponse('No puedes advertir a este usuario!')

        if (!args[0].match(/\<\@(\!)?[0-9]{18}\>/g)) return embedResponse('La mencion tiene que ser el primer argumento!')


        miembro = miembro.user;


        await client.updateData({ id: `${message.guild.id}_${miembro.id}` }, { $inc: { warns: 1 } }, 'warns');

        let data = (await client.updateData({ id: `${message.guild.id}_${miembro.id}` }, { razon: razon }, 'warns'));

        //embedResponse(`El miembro fue advertido!\nAhora tiene: ${data.warns} advertencias.\n\nRazón: ${razon}.`)

        if (data.warns >= 5)
            if (message.mentions.members.first().kickable) message.mentions.members.first().kick(razon)

                .then(a => {
                    message.channel.send('Miembro expulsado').catch(e => { })
                })

                .catch(er => {
                    message.channel.send('Error en expulsar el miembro!').catch(e => { })
                })

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('<a:alarma:767497168381935638> Miembro advertido <a:alarma:767497168381935638>', miembro.displayAvatarURL({ dynamic: true }))
            .addField('Razón', razon.slice(0, 1024))
            .addField('Advertencias totales', data.warns)
            .addField('Advertencias para ser expulsado', 5)

        return message.channel.send({ embed: embed });
    }
}