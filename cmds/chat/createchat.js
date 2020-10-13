const Discord = require("discord.js")

module.exports = {
    config: {
        name: "createchat",
        alias: [],
        description: "Crear un chat",
        usage: "z!createchat <private | public> num",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {


        let max = parseInt(args[1])

        if (!args[0] || !['public', 'private'].includes(args[0].toLowerCase()))
            return embedResponse('Selecciona entre `private` o `public`.\nEjemplo de uso: <prefix>createchat private 15')


        if (!max || max < 2)
            return embedResponse('Pon un numero mayor a 1!')


        if (!max || max > 51)
            return embedResponse('Pon un numero menor a 51!')


        let { grupos } = await client.getData({ id: message.author.id }, 'usuario');

        if (grupos) {
            if (grupos.length >= 10)
                return embedResponse('Has superado el limite de grupos, si quieres borra uno y crea otro!')

        }
        let tok = ((Date.now() + message.author.id) / message.guild.id) * message.author.discriminator;

        let res;
        let check = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

        if (message.author.tag.match(check) || message.content.includes('`')) {
            res = `[EspecialUser#${message.author.discriminator}]`;
        }
        else {
            res = `[${message.author.tag}]`;
        }

        await client.updateData({ token: `${tok}` }, { owner: message.author.id }, 'chat');

        await client.updateData({ token: `${tok}` }, { $addToSet: { admins: message.author.id } }, 'chat');

        await client.updateData({ token: `${tok}` }, { $addToSet: { users: message.author.id } }, 'chat');

        await client.updateData({ token: `${tok}` }, { $addToSet: { joinable: message.author.id } }, 'chat');

        await client.updateData({ token: `${tok}` }, { type: args[0].trim() }, 'chat');

        await client.updateData({ token: `${tok}` }, { max: parseInt(args[1]) }, 'chat');

        await client.updateData({ token: `${tok}` }, { chat: `[LOGS]${res} ha creado el chat!` }, 'chat');

        await client.updateData({ id: message.author.id }, { $addToSet: { grupos: `${tok}` } }, 'usuario');

        await embedResponse(`Token: ${tok}`)

    }
}