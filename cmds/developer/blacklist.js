const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "blacklist"
        this.category = 'developer'
		this.dev = true;
    }
    async run({ client, message, args, embedResponse }) {
        if (!['507367752391196682'].includes(message.author.id))
            return;
        let razon = args.slice(2).join(' ') || 'No especificada!'
        if (!args[1]) return embedResponse('Faltan argumentos.')
        if (!client.users.cache.get(args[1])) return embedResponse('No encontre al usuario!')
        if (!['add', 'remove', 'check'].some(a => a == args[0])) return embedResponse('Add, remove o check?')
        switch (args[0]) {
            case 'add':
                await client.updateData({ id: args[1] }, { bol: true, razon: razon }, 'blacklist');
                return embedResponse('Listo, ahora <@' + args[1] + '> esta en la blacklist.')
            case 'remove':
                await client.updateData({ id: args[1] }, { bol: false, razon: razon }, 'blacklist');
                return embedResponse('Listo, ahora <@' + args[1] + '> no esta en la blacklist.')
            case 'check':
                // eslint-disable-next-line no-case-declarations
                let data = await client.getData({ id: args[1] }, 'blacklist');
                return embedResponse(data.bol ? `<@${data.id}> esta en la blacklist` : 'No esta.')
            default:
                return embedResponse('Error.')
        }
    }
}