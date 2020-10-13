module.exports = {
    config: {
        name: "resetwarns",//Nombre del cmd
        alias: [], //Alias
        description: "Reiniciar advertencias", //Descripción (OPCIONAL)
        usage: "z!resetwarns @mencion",
        category: 'moderacion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!message.member.hasPermission('ADMINISTRATOR')) return embedResponse('No tienes el permiso `ADMINISTRATOR`')


        if (!message.mentions.members.first()) return embedResponse('Menciona a un miembro del servidor!')

        let member = message.mentions.members.first();

        await client.updateData({ id: `${message.guild.id}_${member.id}` }, { warns: 0, razon: 'No especificada!' }, 'warns')

        embedResponse(`Advertencias reseteadas!`)

    }
}