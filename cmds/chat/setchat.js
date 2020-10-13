const Discord = require("discord.js")

module.exports = {
    config: {
        name: "setchat",
        alias: [],
        description: "Establecer un chat",
        usage: "z!setchat token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;




        let embed = new Discord.MessageEmbed()
            .setAuthor('No hay nada aq... Oh, mira a wumpus!')
            .setImage('https://i.imgur.com/YCORRwg.png')
            .setColor(color)
            .setFooter('Usa <prefix>setchat token_chat para ver un chat existente!')
            .setTimestamp()

        if (!args[0])
            return embedResponse('Escribe un token de chat!')


        let check = await rModel('chat').findOne({ token: args[0] });

        if (!check)
            return embedResponse('Token invalido!')


        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, owner, users } = chatG;

        if (type === 'private') {
            if (!joinable.includes(message.author.id))
                return embedResponse('No te puedes unir, es un chat privado y no te han invitado!')

        }

        if (bans.includes(message.author.id)) {
            await client.updateData({ id: message.author.id }, { tokenChat: 'none' }, 'usuario');

            return message.channel.send({ embed: embed.setFooter('Oh oh, parece que estas baneado!') })

        }

        if (!users.includes(message.author.id)) {
            let res;
            let checkR = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

            if (message.author.tag.match(checkR) || message.content.includes('`')) {
                res = `[EspecialUser#${message.author.discriminator}]`;
            }
            else {
                res = `[${message.author.tag}]`;
            }
            await client.updateData({ token: args[0] }, { $push: { chat: `[${Hora()}][LOGS]${res} se ha unido al chat!` } }, 'chat');
        }

        await client.updateData({ id: message.author.id }, { tokenChat: `${args[0]}` }, 'usuario');
        await client.updateData({ token: args[0] }, { $addToSet: { users: message.author.id } }, 'chat');
        if (owner !== message.author.id) {
            await client.updateData({ id: message.author.id }, { $addToSet: { unidos: args[0] } }, 'usuario');
        }

        return embedResponse('Chat establecido!\nToken: ' + args[0])

    }
}