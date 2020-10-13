const Discord = require("discord.js")

module.exports = {
    config: {
        name: "setadmin",
        alias: [],
        description: "Establecer un admin en el chat",
        usage: "z!setadmin user_id token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;


        if (!args[0] || !args[1])
            return embedResponse('Ejemplo de uso: <prefix>setadmin user_id token_chat')


        let user = client.users.cache.get(args[0]);

        if (!user)
            return embedResponse('No he encontrado ese usuario!')


        let checkM = await rModel('chat').findOne({ token: args[1] });

        if (!checkM)
            return embedResponse('Token inexistente!')


        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (owner !== message.author.id)
            return embedResponse('Solo el creador del chat puede agregar un admin!')


        if (admins.includes(args[0]))
            return embedResponse(`El usuario ya era administrador!`)


        await client.updateData({ token: args[1] }, { $addToSet: { admins: `${args[0]}` } }, 'chat')

        return embedResponse(`Has añadido a ${user.tag} como administrador del chat!`)



    }
}