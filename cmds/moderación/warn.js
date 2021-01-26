const Discord = require('discord.js');
const easy = require('easymaty');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "warn"
        this.category = 'moderacion'
        this.botPermissions.guild = ['KICK_MEMBERS']
        this.memberPermissions.guild = ['KICK_MEMBERS']
    }
    async run({ client, message, args, embedResponse, Hora }) {

        let miembro = message.mentions.members.first();

        let razon = args.slice(1).join(' ') || 'No especificada';

        if (!miembro || miembro?.user?.bot || (miembro.user.id == message.author.id)) return embedResponse('<:cancel:779536630041280522> | Menciona a un miembro del servidor.')

        if (miembro.roles.highest.comparePositionTo(message.member.roles.highest) > 0)
            return embedResponse('<:cancel:779536630041280522> | No puedes advertir a este usuario.')

        if (!miembro.kickable)
            return embedResponse('<:cancel:779536630041280522> | No puedo advertir a este usuario.')

        if (!args[0].match(/<@(!)?[0-9]{18}>/g)) return embedResponse('<:cancel:779536630041280522> | La mencion tiene que ser el primer argumento.')

        if (message.author.id != message.guild.ownerID) {
            if (miembro.hasPermission('ADMINISTRATOR'))
                return embedResponse('<:cancel:779536630041280522> | ' + miembro.toString() + ' es administrador.')
        }

        miembro = miembro.user;

        let chec = async (e) => { if (await require('../../models/warns.js').findOne({ idMember: miembro.id, token: e })) return await chec(easy.clave(6, '123456789')); else return e; }

        let res = await chec(easy.clave(6, '123456789'));

        let data = (await client.updateData({ idGuild: message.guild.id, idMember: miembro.id }, { $push: { warns: { razon: razon, fecha: Hora(Date.now(), true), mod: message.author.tag, token: res } } }, 'warns'));

        let check = 5
        //embedResponse(`El miembro fue advertido!\nAhora tiene: ${data.warns} advertencias.\n\nRazón: ${razon}.`)
        if (data.warns.length >= check)

            if (message.mentions.members.first().kickable) message.mentions.members.first().kick(razon)

                .then(async () => {
                    embedResponse('<:accept:779536642365063189> | ' + miembro.tag + ' fue expulsado').catch(() => { })
                    await require('../../models/warns.js').deleteOne({ idGuild: message.guild.id, idMember: miembro.id });
                })

                .catch(() => {
                    embedResponse('<:cancel:779536630041280522> Error en expulsar el miembro!').catch(() => { })
                })

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('<a:alarma:767497168381935638> Miembro advertido <a:alarma:767497168381935638>')
            .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
            .addField('<:reason2:779695137205911552> Razón', razon.slice(0, 1024), true)
            .addField('<:moderator:779536592431087619> Moderador', message.author.tag, true)
            .addField('\u200b', '\u200b', true)
            .addField('📄 Advertencias totales', data.warns.length, true)
            .addField('<:reason:779536605047554068> Advertencias para ser expulsado', check, true)
            .setFooter(`🆔 ID: ${res} - Fecha: ${Hora(Date.now(), true)}`)

        return message.channel.send({ embed: embed }).catch(() => { });
    }
}