module.exports = {
    config: {
        name: "blacklist",
        alias: [],
        description: "Añadir o quitar a alguien de la blacklist",
        usage: "z!blacklist user_id true/false",
        category: 'developer'
    },
    run: async ({ client, message, args, embedResponse }) => {
        if (!['507367752391196682'].includes(message.author.id))
            return embedResponse('No puedes usar este comando!')
        let razon = args.slice(2).join(' ') || 'No especificada!'
        if (!args[0]) return embedResponse('Escribe la ID de un usuario!')
        if (!client.users.cache.get(args[0])) return embedResponse('No encontre al usuario!')
        if (!['true', 'false'].includes(args[1])) return embedResponse('¿true o false?')
        await client.updateData({ id: args[0] }, { bol: args[1], razon: razon }, 'blacklist');
        return embedResponse('Listo!')
    }
}