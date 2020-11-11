module.exports = {
    config: {
        name: "checkblacklist",
        alias: [],
        description: "Revisar la blacklist",
        usage: "z!checkblacklist user_id",
        category: 'developer'
    },
    run: async ({ client, message, args, embedResponse }) => {
        if (!["507367752391196682"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!')
        if (!args[0]) return embedResponse('Escribe la ID de un usuario!')
        if (!client.users.cache.get(args[0])) return embedResponse('No encontre al usuario!')
        await client.getData({ id: args[0] }, 'blacklist').then((data) => {
            return embedResponse(`${data.bol ? 'Está en la blacklist :c\nRazón: ' + data.razon : 'No está en la blacklist'}`)

        })
    }
}