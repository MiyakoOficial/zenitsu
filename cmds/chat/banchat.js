const Discord = require("discord.js")

module.exports = {
    config: {
        name: "banchat",
        alias: [],
        description: "Banear a una person del chat",
        usage: "z!banchat token user_id token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        if (!args[0] || !args[1])
            return embedResponse('Ejemplo de uso: <prefix>banchat user_id token_chat')


        let user = client.users.cache.get(args[0]);

        if (!user)
            return embedResponse('No he encontrado ese usuario!')


        let checkM = await rModel('chat').findOne({ token: args[1] });

        if (!checkM)
            return embedResponse('Token inexistente!')


        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (!admins.includes(message.author.id))
            return embedResponse('Solos los admins pueden banear!')


        if (admins.includes(args[0])) {
            if (owner !== message.author.id)
                return embedResponse(`El usuario es administrador!`)

        }

        if (args[0] == message.author.id)
            return embedResponse('No te puedes banear!')


        if (args[0] == owner)
            return embedResponse('No puedes banear al creador!')

        if (bans.includes(args[0]))
            return embedResponse('El usuario ya estaba baneado!')


        await client.updateData({ token: `${args[1]}` }, { $addToSet: { bans: `${args[0]}` } }, 'chat');
        await client.updateData({ token: `${args[1]}` }, { $pull: { users: `${args[0]}` } }, 'chat');
        await client.updateData({ token: `${args[1]}` }, { $pull: { joinable: `${args[0]}` } }, 'chat');
        await client.updateData({ token: `${args[1]}` }, { $pull: { admins: `${args[0]}` } }, 'chat');
        await client.updateData({ id: `${args[0]}` }, { $pull: { unidos: `${args[1]}` } }, 'usuario');
        await client.updateData({ id: `${args[0]}` }, { token: `none` }, 'usuario');

        return embedResponse(`Has baneado a ${user.tag} del chat!`)



    }
}