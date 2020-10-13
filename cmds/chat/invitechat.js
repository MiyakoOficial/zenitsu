const Discord = require("discord.js")

module.exports = {
    config: {
        name: "invitechat",
        alias: [],
        description: "Invitar a alguien a un chat privado",
        usage: "z!invitechat user_id token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        if (!args[0])
            return embedResponse('Ejemplo de uso: `<prefix> invitechat user_id token_chat`')


        let check = await rModel('chat').findOne({ token: args[1] });

        if (!check)
            return embedResponse('Token invalido!')


        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, users } = chatG;

        if (!admins.includes(message.author.id)) {
            return embedResponse('No puedes invitar a nadie sin ser admin!')

        }

        if (bans.includes(args[0]))
            return embedResponse('Ese usuario está baneado, usa <prefix>unbanchat user_id token_chat!')


        if (!client.users.cache.get(args[0]))
            return embedResponse('No he encontrado a ese usuario!')


        if (joinable.includes(args[0]))
            return embedResponse('Ya lo has invitado al chat!')


        if (users.includes(args[0]))
            return embedResponse('Ya está en el chat!')


        await client.updateData({ token: args[1] }, { $addToSet: { joinable: args[0] } }, 'chat');

        return embedResponse(`Has invitado a \`${client.users.cache.get(args[0]).tag}\`!`)

    }
}