const Discord = require("discord.js")

module.exports = {
    config: {
        name: "chat",
        alias: [],
        description: "Ver el chat",
        usage: "z!chat",
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

        let { tokenChat } = await client.getData({ id: message.author.id }, 'usuario');
        if (!tokenChat || tokenChat == 'none') return message.channel.send({ embed: embed })


        else {
            let check = await rModel('chat').findOne({ token: tokenChat });
            if (!check) {
                await client.updateData({ id: message.author.id }, { tokenChat: 'none' }, 'usuario');
                return embedResponse('El token establecido no existe!');
            }

            let { chat, bans, type } = await client.getData({ token: tokenChat }, 'chat');


            if (bans && bans.includes(message.author.id)) {
                await client.updateData({ id: message.author.id }, { tokenChat: 'none' }, 'usuario');

                return message.channel.send({ embed: embed.setFooter('Oh oh, parece que estas baneado del chat!') })

            }

            if (!chat || chat == 0) return message.channel.send({ embed: embed.setFooter('El chat está vacio, se el primero en hablar!') })


            let embed1 = new Discord.MessageEmbed()
                .setColor(color)
                .setTimestamp()
                .setDescription(`\`\`\`ini\n${chat.reverse().slice(0, 10).reverse().join('\n')}\`\`\``)
                .setFooter(`Token actual: ${tokenChat}, Tipo de chat: ${type}`)

            return message.channel.send({ embed: embed1 })

        }

    }
}