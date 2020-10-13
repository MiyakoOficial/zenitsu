const Discord = require("discord.js")

module.exports = {
    config: {
        name: "leavechat",
        alias: [],
        description: "Dejar un chat",
        usage: "z!leavechat token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        if (!args[0])
            return embedResponse('Escribe un token de chat!')


        let check = await rModel('chat').findOne({ token: args[0] });

        if (!check)
            return embedResponse('Token invalido!')


        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, users, owner } = chatG;

        if (!users.includes(message.author.id))
            return embedResponse('No estas en el chat!')

        if (owner === message.author.id)
            return embedResponse('No puedes abandonar el chat, borrala!')

        await client.updateData({ id: message.author.id }, { tokenChat: `none` }, 'usuario');
        await client.updateData({ token: args[0] }, { $pull: { users: message.author.id } }, 'chat');
        await client.updateData({ token: args[0] }, { $pull: { admins: message.author.id } }, 'chat');
        await client.updateData({ id: message.author.id }, { $pull: { unidos: args[0] } }, 'usuario');
        await client.updateData({ token: args[0] }, { $pull: { joinable: message.author.id } }, 'chat');
        let res;
        let checkR = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

        if (message.author.tag.match(checkR) || message.content.includes('`')) {
            res = `[EspecialUser#${message.author.discriminator}]`;
        }
        else {
            res = `[${message.author.tag}]`;
        }
        await client.updateData({ token: args[0] }, { $push: { chat: `[${Hora()}][LOGS]${res} ha dejado el chat!` } }, 'chat');

        return embedResponse('Has dejado el chat: ' + args[0])

    }
}