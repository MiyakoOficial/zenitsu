const Discord = require("discord.js")

module.exports = {
    config: {
        name: "sendchat",
        alias: [],
        description: "Enviar un mensaje al chat",
        usage: "z!sendchat mensaje",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        let check = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

        let chatU = await client.getData({ id: message.author.id }, 'usuario');

        let embed = new Discord.MessageEmbed()
            .setAuthor('No hay nada aq... Oh, mira a wumpus!')
            .setImage('https://i.imgur.com/YCORRwg.png')
            .setColor(color)
            .setFooter('Usa <prefix>setchat token_chat para ver un chat existente!')
            .setTimestamp()

        let { tokenChat } = chatU;

        if (!tokenChat || tokenChat == 'none')
            return embedResponse('Establece un chat!\n<prefix>setchat token_chat')


        let xCheck = await rModel('chat').findOne({ token: tokenChat });

        if (!xCheck)
            return embedResponse("El chat que tienes establecido no existe!")


        let { bans } = await client.getData({ token: tokenChat }, 'chat')


        if (bans.includes(message.author.id)) {
            await client.updateData({ id: message.author.id }, { tokenChat: 'none' }, 'usuario');

            return message.channel.send({ embed: embed.setFooter('Oh oh, parece que estas baneado!') })

        }
        if (!args[0])
            return embedResponse('Ejemplo de uso: <prefix>sendchat Hola gente!')


        let regex = args.join(' ').match(check);

        let regexTag = message.author.tag.match(check);

        if (regex || args.join(' ').includes('`'))
            return embedResponse('Este comando no permite caracteres especiales!')


        if (args.join(' ').length >= 131)
            return embedResponse('El limite del texto es 130 letras!')


        if (regexTag) {
            res = '[EspecialUser#' + message.author.discriminator + ']';
        }
        else {
            res = "[" + message.author.tag + "]";
        }

        await client.updateData({ token: tokenChat }, { $addToSet: { users: message.author.id } }, 'chat');
        await client.updateData({ token: tokenChat }, { $push: { chat: `[${Hora()}]${res}: ${args.join(' ')}` } }, 'chat');

        return embedResponse(`Enviado: ${args.join(' ')}`)

    }
}