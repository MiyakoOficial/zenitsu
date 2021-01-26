const Discord = require('discord.js');
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "mute"
        this.category = 'moderacion'
        this.memberPermissions = { guild: ['KICK_MEMBERS', 'MANAGE_MESSAGES'], channel: [] }
        this.botPermissions = { guild: ['ADMINISTRATOR', 'MANAGE_ROLES', 'MANAGE_CHANNELS'], channel: [] }
    }

    run({ client, message, args, embedResponse }) {

        let roles = message.guild.roles.cache.filter(a => !a.managed && a.editable);

        let roleName = 'MUTED';
        let role = roles.find(a => a.name == roleName);
        if (!role)
            return embedResponse('<:thonk:722390649659195392> | Necesitas crear un rol llamado `MUTED` y que yo pueda gestionar.')

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

        return message.guild.member(miembro).roles.add(role).then(() => {
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
                .setTitle('<a:alarma:767497168381935638> Miembro silenciado <a:alarma:767497168381935638>')
                .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
                .addField('<:reason2:779695137205911552> Razón', razon.slice(0, 1024), true)
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
                .setDescription('<:cancel:779536630041280522> | Error al intentar silenciar al miembro.')
            return message.channel.send({ embed: embed }).catch(() => { });
        })
    }
}