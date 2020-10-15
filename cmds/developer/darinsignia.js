const Discord = require("discord.js")

module.exports = {
    config: {
        name: "darinsignia",
        alias: [],
        description: "private",
        usage: "z!private command jaja",
        category: 'developer'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!["507367752391196682"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!')

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();

        if (!user)
            return embedResponse('Usuario no encontrado.')

        let data = (await client.updateData({ id: user.id }, { $push: { insignias: args[1] } }, 'profile'));

        return embedResponse(`Insignia añadida a ${user.tag}\n\nActuales: ${data.insignias.join(', ')}`);
    }
};