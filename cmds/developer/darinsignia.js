const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "darinsignia"
        this.category = 'developer'

    }
    async run({ client, message, args, embedResponse }) {

        if (!["507367752391196682"].includes(message.author.id))
            return;
        let user = client.users.cache.get(args[0]) || message.mentions.users.first();

        if (!user)
            return embedResponse('Usuario no encontrado.')

        if (!args[0])
            return embedResponse('Que insignia quieres dar?')

        let data = (await client.updateData({ id: user.id }, { $addToSet: { insignias: args[1] } }, 'profile'));

        return embedResponse(`Insignia añadida a ${user.tag}\n\nActuales: ${data.insignias.join(', ')}`);
    }
};