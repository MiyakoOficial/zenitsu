const Discord = require('discord.js');

module.exports = {
    config: {
        name: "pardon", //nombre del cmd
        alias: [], //Alias
        description: "Quita una advertencia a un miembro", //Descripción (OPCIONAL)
        usage: "z!pardon @mencion",
        category: 'moderacion'

    }, run: async ({ client, message, args, embedResponse }) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) return embedResponse('No tienes el permiso `KICK_MEMBERS`');

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Menciona a un miembro del servidor!')

        if (miembro.user.bot) return embedResponse('No puedes perdonar a un bot.');

        miembro = miembro.user;

        if (miembro.id == message.author.id) return embedResponse('No te puedes perdonar a ti mismo.')

        let datazo = (await client.getData({ idGuild: message.guild.id, idMember: miembro.id }, 'warns'));

        if (datazo.warns.length <= 0)
            return embedResponse('El miembro no tiene advertencias.')

        let data;

        let checkk = datazo.warns.find(a => a.token == args[1])

        if (args[1] == 'last') {

            data = (await client.updateData({ idGuild: message.guild.id, idMember: miembro.id }, { $pop: { warns: 1 } }, 'warns'));

        }

        else if (checkk) {

            data = (await client.updateData({ idGuild: message.guild.id, idMember: miembro.id }, { $pull: { warns: checkk } }, 'warns'));

        }

        else {

            return embedResponse('Elije quitar la ultima advertencia(last) o una por su ID.')

        }

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('Miembro perdonado')
            .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
            .setDescription('Ahora el miembro tiene ' + data.warns.length + ' advertencia(s).')
            .setFooter('Advertencia quitada por ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        return message.channel.send({ embed: embed }).catch(() => { });
    }
}