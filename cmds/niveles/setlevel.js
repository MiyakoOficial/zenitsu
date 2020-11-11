module.exports = {
    config: {
        name: "setlevel", //nombre del cmd
        alias: [], //Alias
        description: "Establecer el nivel del miembro", //Descripción (OPCIONAL)
        usage: "z!setlevel",
        category: 'niveles'

    }, run: async ({ client, message, args, embedResponse }) => {

        if (!message.member.hasPermission('ADMINISTRATOR')) return embedResponse('No tienes el permiso `ADMINISTRATOR`')


        let miembro = message.mentions.members.first();
        //let razon = args.slice(1).join(' ') || 'No especificada';
        if (!miembro) return embedResponse('Menciona a un miembro del servidor!')


        if (!args[0].match(/<@(!)?[0-9]{18}>/g)) return embedResponse('La mencion tiene que ser el primer argumento!')


        if (isNaN(args[1])) return embedResponse('El segundo argumento tiene que ser un numero!')


        if (parseInt(args[1]) < 0) return embedResponse('El segundo argumento debe ser igual o mayor a 0!')


        if (parseInt(args[1]) > 500) return embedResponse('El segundo argumento debe ser igual o menor a 500!')


        let data = (await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${miembro.user.id}` }, { nivel: parseInt(args[1]) }, 'niveles'));

        //await client.getData({ id: `${message.guild.id}.${miembro.id}` }, 'warns').then((data) => {
        return embedResponse(`Ahora el miembro ${miembro.user.username} es nivel ${data.nivel}!`)

        //});



    }
}