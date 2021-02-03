const Discord = require('discord.js');
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "unmute"
        this.category = 'moderacion'
        this.memberPermissions = { guild: ['MANAGE_MESSAGES', 'KICK_MEMBERS'], channel: [] }
        this.botPermissions = { guild: ['ADMINISTRATOR', 'MANAGE_ROLES', 'MANAGE_CHANNELS'], channel: [] }
    }
    run({ client, message, args, embedResponse }) {

        let roles = message.guild.roles.cache.filter(a => !a.managed && a.editable);

        let roleName = 'MUTED';
        let role = roles.find(a => a.name == roleName);

        if (!role)
            return embedResponse('<:thonk:722390649659195392> | Necesitas crear un rol llamado `MUTED` y que yo pueda gestionar.')

        let miembro = message.mentions.members.first();

        if (!miembro || miembro?.user?.bot) return embedResponse('<:cancel:804368628861763664> | Menciona a un miembro del servidor.')

        if (miembro.roles.highest.comparePositionTo(message.member.roles.highest) > 0)
            return embedResponse('<:cancel:804368628861763664> | No puedes quitarle el silencio a este usuario.')

        if (miembro.roles.highest.comparePositionTo(message.guild.me.roles.highest) > 0)
            return embedResponse('<:cancel:804368628861763664> | No puedo moderar a este usuario.')

        if (!args[0].match(/<@(!)?[0-9]{17,18}>/g)) return embedResponse('<:cancel:804368628861763664> | La mencion tiene que ser el primer argumento.')

        if (message.author.id != message.guild.ownerID) {
            if (miembro.hasPermission('ADMINISTRATOR'))
                return embedResponse('<:cancel:804368628861763664> | ' + miembro.toString() + ' es administrador.')
        }

        miembro = miembro.user;

        if (miembro.id == message.author.id) return embedResponse('<:cancel:804368628861763664> | No te puedes quitar el silencio a ti mismo.')

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
                .setTitle('<a:alarma:804396920466178088> Miembro desmuteado <a:alarma:804396920466178088>')
                .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
                .addField('<:moderator:804368587115593800> Moderador', message.author.tag, true)
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
                .setDescription('<:cancel:804368628861763664> | Error al intentar quitar el silencio al miembro.')
            return message.channel.send({ embed: embed }).catch(() => { });
        })
    }
}