const Discord = require('discord.js');

module.exports = {
    config: {
        name: "checkwarns",//Nombre del cmd
        alias: [], //Alias
        description: "Revisar el numero advertencias", //Descripción (OPCIONAL)
        usage: "z!checkwarns @mencion",
        category: 'moderacion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!message.mentions.members.first()) return embedResponse('Menciona a un miembro del servidor!')

        let miembro = message.mentions.users.first();

        let data = await client.getData({ idGuild: message.guild.id, idMember: message.mentions.users.first().id }, 'warns');

        let pagina = Number(args[1]) <= 0 || !Number(args[1]) ? 1 : Number(args[1]);

        if (!data.warns.length) return embedResponse('El miembro no tiene advertencias.')

        let datos = data.warns.reverse()[pagina - 1];

        if (!datos) return embedResponse('Sin datos.')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle('<a:alarma:767497168381935638> Advertencia del miembro <a:alarma:767497168381935638>')
            .setAuthor(miembro.tag, miembro.displayAvatarURL({ dynamic: true }))
            .addField(pagina == 1 ? 'Ultima razón:' : 'Razon:', datos.razon.slice(0, 1024))
            .addField(pagina == 1 ? 'Ultimo moderador:' : 'Moderador:', datos.mod)
            .setFooter(`Pagina: ${pagina}/${data.warns.length}`)

        return message.channel.send({ embed: embed }).catch(e => { })

        //embedResponse(`Tiene ${!data.warns ? 0 : data.warns} advertencias\n\nUltima razón: ${!data.razon ? 'No especificada!' : data.razon}`)

    }
}