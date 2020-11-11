module.exports = {
    config: {
        name: "clear", //nombre del cmd
        alias: ['purge'], //Alias
        description: "Borrar mensajes", //Descripción (OPCIONAL)
        usage: "z!clear numero",
        category: 'moderacion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return embedResponse('No tienes el permiso `MANAGE_MESSAGES`!')
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return embedResponse('No tengo el permiso `MANAGE_MESSAGES`')
        if (!args[0]) return embedResponse('Escribe un numero!')
        if (isNaN(args[0])) return embedResponse('Escribe un numero!')
        if (args[0] >= 100 || args[0] === 0) return embedResponse('Un numero del 1 al 99')
        await message.delete()
        await message.channel.bulkDelete(args[0], true).then(d => {
            if (d.size < args[0]) return d.size === 0 ? embedResponse('Ningun mensaje fue eliminado!') : embedResponse('Mensajes eliminados: ' + d.size)

            else return embedResponse('Mensajes eliminados: ' + d.size)

        })
    }
}
