const Discord = require('discord.js');
module.exports = {
    config: {
        name: "mute", //nombre del cmd
        alias: [], //Alias
        description: "Silenciar a un miembro", //Descripción (OPCIONAL)
        usage: "z!mute @mencion razon(opcional)",
        category: 'moderacion',
        botPermissions: ['ADMINISTRATOR', 'MANAGE_ROLES', 'MANAGE_CHANNELS'],
        memberPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS']

    }, run: ({ client, message, args, embedResponse }) => {

        if (message.author.id != '507367752391196682')
            return;

        let roles = message.guild.roles.cache.filter(a => !a.managed && a.editable);

        let roleName = 'MUTED';

        if (!roles.find(a => a.name == roleName)) {
            embedResponse('<:cancel:779536630041280522> | Necesitas crear el rol `MUTED`\n~~¿Deseas crearlo ahora? [Escribe `s`]~~')
            const filter = m => m.author.id == message.author.id;
            return message.channel.awaitMessages(filter, { max: 1, time: require('ms')('10s'), errors: ['time'] })
                .then(collected => {
                    let msg = collected.array()[0];
                    if (msg.content == 's') {
                        let find = message.guild.roles.cache.filter(a => !a.managed && a.editable).sort((a, b) => b.position - a.position).find(a => !a.permissions.toArray().includes('KICK_MEMBERS'));
                        return message.guild.roles.create({ data: { position: find.position, hoist: true, name: roleName, color: '#9c4b2d', permissions: 0 }, reason: 'Rol creado para silenciar personas.' })
                            .then(() =>
                                message.reply('Rol creado.').then(a => a.delete({ timeout: 3000 }))
                            )
                            .catch(() =>
                                message.reply('Error al intentar crear el rol.').then(a => a.delete({ timeout: 3000 }))
                            )
                    }
                })
                .catch(() => { });
        }
        let miembro = message.mentions.members.first();

        let razon = args.slice(1).join(' ') || 'No especificada.';

        if (!miembro || miembro?.user?.bot) return embedResponse('<:cancel:779536630041280522> | Menciona a un miembro del servidor.')

        if (miembro.roles.highest.comparePositionTo(message.member.roles.highest) > 0)
            return embedResponse('<:cancel:779536630041280522> | No puedes silenciar a este usuario.')

        if (miembro.roles.highest.comparePositionTo(message.guild.me.roles.highest) > 0)
            return embedResponse('<:cancel:779536630041280522> | No puedo moderar a este usuario.')

        if (!args[0].match(/<@(!)?[0-9]{18}>/g)) return embedResponse('<:cancel:779536630041280522> | La mencion tiene que ser el primer argumento.')

        if (message.author.id != message.guild.ownerID) {
            if (miembro.hasPermission('ADMINISTRATOR'))
                return embedResponse('<:cancel:779536630041280522> | ' + miembro.toString() + ' es administrador.')
        }
        miembro = miembro.user;

        if (miembro.id == message.author.id) return embedResponse('<:cancel:779536630041280522> | No te puedes silenciar a ti mismo.')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('<a:alarma:767497168381935638> Miembro silenciado <a:alarma:767497168381935638>')
            .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
            .addField('<:reason2:779695137205911552> Razón', razon.slice(0, 1024), true)
            .addField('<:moderator:779536592431087619> Moderador', message.author.tag, true)
            .addField('<:reason:779536605047554068> Advertencias para ser expulsado', razon, true)

        return message.channel.send({ embed: embed }).catch(() => { });
    }
}