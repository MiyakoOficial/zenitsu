const Discord = require('discord.js');
module.exports = {
    config: {
        name: "mute", //nombre del cmd
        alias: [], //Alias
        description: "Quitarle el rol \"MUTED\" a un miembro", //Descripción (OPCIONAL)
        usage: "z!unmute @mencion",
        category: 'moderacion',
        botPermissions: ['ADMINISTRATOR', 'MANAGE_ROLES', 'MANAGE_CHANNELS'],
        memberPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS']

    }, run: ({ client, message, args, embedResponse }) => {

        let roles = message.guild.roles.cache.filter(a => !a.managed && a.editable);

        let roleName = 'MUTED';
        let role = roles.find(a => a.name == roleName);
        if (!role) {
            embedResponse('<:cancel:779536630041280522> | Necesitas crear el rol `MUTED`\n~~¿Deseas crearlo ahora? [Escribe `s`]~~')
            const filter = m => m.author.id == message.author.id;
            return message.channel.awaitMessages(filter, { max: 1, time: require('ms')('10s'), errors: ['time'] })
                .then(collected => {
                    let msg = collected.array()[0];
                    if (msg.content == 's') {
                        return message.guild.roles.create({ data: { hoist: true, name: roleName, color: '#9c4b2d', permissions: 0 }, reason: 'Rol creado para silenciar personas.' })
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

        if (!miembro || miembro?.user?.bot) return embedResponse('<:cancel:779536630041280522> | Menciona a un miembro del servidor.')

        if (miembro.roles.highest.comparePositionTo(message.member.roles.highest) > 0)
            return embedResponse('<:cancel:779536630041280522> | No puedes quitarle el silencio a este usuario.')

        if (miembro.roles.highest.comparePositionTo(message.guild.me.roles.highest) > 0)
            return embedResponse('<:cancel:779536630041280522> | No puedo moderar a este usuario.')

        if (!args[0].match(/<@(!)?[0-9]{18}>/g)) return embedResponse('<:cancel:779536630041280522> | La mencion tiene que ser el primer argumento.')

        if (message.author.id != message.guild.ownerID) {
            if (miembro.hasPermission('ADMINISTRATOR'))
                return embedResponse('<:cancel:779536630041280522> | ' + miembro.toString() + ' es administrador.')
        }

        miembro = miembro.user;

        if (miembro.id == message.author.id) return embedResponse('<:cancel:779536630041280522> | No te puedes quitar el silencio a ti mismo.')

        return message.guild.member(miembro).roles.remove(role).then(() => {
            let types = ['text', 'category', 'news']
            let canales = message.guild.channels.cache
                .filter(a => types.includes(a.type))
                .filter(a => a.manageable && ch(a))
                .array();
            function ch(c) {
                let permissions = c.permissionOverwrites.array().find(r => r.id == role.id)
                if (!permissions) {
                    return true
                }
                else if (!permissions.deny.toArray().includes('SEND_MESSAGES')) {
                    return true
                }
                else return false;
            }

            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setTimestamp()
                .setTitle('<a:alarma:767497168381935638> Miembro desmuteado <a:alarma:767497168381935638>')
                .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
                .addField('<:moderator:779536592431087619> Moderador', message.author.tag, true)
            return message.channel.send({ embed: embed }).finally(async () => {
                for (let c of canales) {
                    await Discord.Util.delayFor(2000)
                    try {
                        await c.updateOverwrite(role, { SEND_MESSAGES: false })
                    } catch {
                        return false;
                    }
                }
            })
        }).catch(() => {
            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setTimestamp()
                .setDescription('<:cancel:779536630041280522> | Error al intentar quitar el silencio al miembro.')
            return message.channel.send({ embed: embed }).catch(() => { });
        })
    }
}