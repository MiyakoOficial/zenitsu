const Discord = require('discord.js');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "checkwarns"
        this.category = 'moderacion'

    }
    async run({ client, message, args, embedResponse }) {

        if (!message.mentions.members.first()) return embedResponse('<:cancel:779536630041280522> | Necesitas mencionar a un miembro.')

        let miembro = message.mentions.users.first();

        let data = await client.getData({ idGuild: message.guild.id, idMember: message.mentions.users.first().id }, 'warns');

        let pagina = Number(args[1]) <= 0 || !Number(args[1]) ? 1 : Number(args[1]);

        if (!data.warns.length) return embedResponse('📜 | ' + miembro.toString() + ' no tiene advertencias en este servidor.')

        let datos = data.warns.reverse()[pagina - 1];

        if (!datos) return embedResponse(`<:cancel:779536630041280522> | En la pagina ${pagina} no hay datos.`)

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('<a:alarma:767497168381935638> Advertencia del miembro <a:alarma:767497168381935638>')
            .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
            .addField(pagina == 1 ? '<:reason2:779695137205911552> Ultima razón:' : '<:reason2:779695137205911552> Razón:', datos.razon.slice(0, 1024))
            .addField(pagina == 1 ? '<:moderator:779536592431087619> Ultimo moderador:' : '<:moderator:779536592431087619> Moderador:', datos.mod)
            .addField('🗓️ Fecha', datos.fecha)
            .addField('🆔 ID', datos.token)
            .setFooter(`📄 Pagina: ${pagina}/${data.warns.length}`)

        return message.channel.send({ embed: embed }).catch(() => { })

        //embedResponse(`Tiene ${!data.warns ? 0 : data.warns} advertencias\n\nUltima razón: ${!data.razon ? 'No especificada!' : data.razon}`)

    }
}