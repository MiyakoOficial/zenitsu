const Discord = require("discord.js")

module.exports = {
    config: {
        name: "deletechat",
        alias: [],
        description: "Borrar un chat",
        usage: "z!deletechat token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        if (!args[0])
            return embedResponse('Ejemplo de uso: <prefix>deletechat token_chat')


        let checkM = await rModel('chat').findOne({ token: args[0] });

        if (!checkM)
            return embedResponse('Token inexistente!')


        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (owner !== message.author.id)
            return embedResponse('No puedes borrar este chat, solo el creador puede!')


        embedResponse('Chat borrado!')
        return await deleteChatByToken(args[0]);

        async function deleteChatByToken(tokenHere) {

            let { users } = await client.getData({ token: tokenHere }, 'chat');

            for (let x of users) {

                try {

                    await client.updateData({ id: x }, { $pull: { grupos: tokenHere } }, 'usuario');

                    await client.updateData({ id: x }, { $pull: { unidos: tokenHere } }, 'usuario');

                } catch (err) { }

            }

            try {

                rModel('chat').deleteOne({
                    token: tokenHere
                }).exec();

            } catch (err) { }

            return true;

        }

    }
}