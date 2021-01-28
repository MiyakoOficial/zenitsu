const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "darinsignia"
        this.category = 'developer'
		this.dev = true;
    }
    async run({ client, message, args, embedResponse }) {

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();

        if (!user)
            return embedResponse('Usuario no encontrado.')

        if (!args[0])
            return embedResponse('Que insignia quieres dar?')

        let data = (await client.updateData({ id: user.id }, { $addToSet: { insignias: args[1] } }, 'profile'));

        return embedResponse(`Insignia añadida a ${user.tag}\n\nActuales: ${data.insignias.join(', ')}`);
    }
};