module.exports = {
    config: {
        name: "resetwarns", //nombre del cmd
        alias: [], //Alias
        description: "Reiniciar advertencias", //Descripción (OPCIONAL)
        usage: "z!resetwarns @mencion",
        category: 'moderacion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!message.member.hasPermission('ADMINISTRATOR')) return embedResponse('No tienes el permiso `ADMINISTRATOR`')

        if (!message.mentions.members.first()) return embedResponse('Menciona a un miembro del servidor!')

        let member = message.mentions.members.first();

        await require('../../models/warns.js').deleteOne({ idGuild: message.guild.id, idMember: member.id });

        embedResponse(`Advertencias reseteadas!`)

    }
}