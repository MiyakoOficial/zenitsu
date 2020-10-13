const Discord = require("discord.js")

module.exports = {
    config: {
        name: "unsetadmin",
        alias: [],
        description: "Quitar un admin en el chat",
        usage: "z!unsetadmin user_id token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        if (!args[0] || !args[1])
            return embedResponse('Ejemplo de uso: <prefix>unsetadmin user_id token_chat')


        let user = client.users.cache.get(args[0]);

        if (!user)
            return embedResponse('No he encontrado ese usuario!')


        let checkM = await rModel('chat').findOne({ token: args[1] });

        if (!checkM)
            return embedResponse('Token inexistente!')


        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (owner !== message.author.id)
            return embedResponse('Solo el creador del chat puede eliminar un admin!')


        if (!admins.includes(args[0]))
            return embedResponse(`El usuario no era administrador!`)


        if (args[0] == owner)
            return embedResponse('No te puedes eliminar como admin!')


        await client.updateData({ token: args[1] }, { $pull: { admins: `${args[0]}` } }, 'chat')

        return embedResponse(`Has eliminado a ${user.tag} como administrador del chat!`)


    }
}