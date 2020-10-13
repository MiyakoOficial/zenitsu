const Discord = require("discord.js")

module.exports = {
    config: {
        name: "unbanchat",
        alias: [],
        description: "Desbanear a una person del chat",
        usage: "z!unban token user_id token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        if (!args[0] || !args[1])
            return embedResponse('Ejemplo de uso: <prefix>unbanchat user_id token_chat')


        let user = client.users.cache.get(args[0]);

        if (!user)
            return embedResponse('No he encontrado ese usuario!')


        let checkM = await rModel('chat').findOne({ token: args[1] });

        if (!checkM)
            return embedResponse('Token inexistente!')


        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (!admins.includes(message.author.id))
            return embedResponse('Solos los admins pueden desbanear!')


        if (args[0] == owner || args[0] == message.author.id)
            return embedResponse('No te puedes desbanear!')


        if (!bans.includes(args[0]))
            return embedResponse('El usuario ya estaba desbaneado!')


        await client.updateData({ token: args[1] }, { $pull: { bans: `${args[0]}` } }, 'chat');

        embedResponse(`Has desbaneado a ${user.tag} del chat!`)



    }
}