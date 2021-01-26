const Discord = require('discord.js');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "pardon"
        this.category = 'moderacion'
        this.memberPermissions = { guild: ['KICK_MEMBERS'], channel: [] }
    }
    async run({ client, message, args, embedResponse }) {

        let miembro = message.mentions.members.first();

        if (!miembro || miembro?.user?.bot) return embedResponse('<:cancel:779536630041280522> | Menciona a un miembro del servidor.')

        miembro = miembro.user;

        if (miembro.id == message.author.id) return embedResponse('<:cancel:779536630041280522> | No te puedes perdonar a ti mismo.')

        let datazo = (await client.getData({ idGuild: message.guild.id, idMember: miembro.id }, 'warns'));

        if (datazo.warns.length <= 0)
            return embedResponse('📜 | ' + miembro.toString() + ' no tiene advertencias.')

        let data;

        let checkk = datazo.warns.find(a => a.token == args[1])

        if (args[1] == 'last') {

            data = (await client.updateData({ idGuild: message.guild.id, idMember: miembro.id }, { $pop: { warns: 1 } }, 'warns'));

        }

        else if (checkk) {

            data = (await client.updateData({ idGuild: message.guild.id, idMember: miembro.id }, { $pull: { warns: checkk } }, 'warns'));

        }

        else {

            return embedResponse('<:cancel:779536630041280522> | z!pardon @mencion < last | ID de la advertencia >')

        }

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('Miembro perdonado')
            .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
            .setDescription('📢 Ahora el miembro tiene ' + data.warns.length + ' advertencia(s).')
            .setFooter('Advertencia quitada por ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        return message.channel.send({ embed: embed }).catch(() => { });
    }
}