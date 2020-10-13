const Discord = require("discord.js")

module.exports = {
    config: {
        name: "editchat",
        alias: [],
        description: "Editar un chat",
        usage: "z!editchat token <name | maxusers | description> new_value",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        let check = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

        if (!args[0])
            return embedResponse('Escribe que quieres cambiar!\nEjemplo de uso: <prefix>editchat token_chat name(description o maxusers) new_name(description o maxusers)')

        let checkM = await rModel('chat').findOne({ token: args[0] });

        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, admins, owner } = chatG;

        if (!checkM)
            return embedResponse('Token invalido!')


        if (args[1] === 'name') {
            if (owner !== message.author.id)
                return embedResponse('No puedes cambiar el nombre del chat!')


            if (!args[2] || args.slice(2).length >= 21)
                return embedResponse('Elije un nombre con un nombre menor o igual a 20 caracteres!')


            let regex = args.slice(2).join(' ').match(check);

            if (regex || args.slice(2).join(' ').includes('`'))
                return embedResponse('Ese nombre tiene caracteres no permitidos!')

            await client.updateData({ token: `${args[0]}` }, { name: args.slice(2).join(' ') }, 'chat');

            return embedResponse(`Nombre cambiado a: ${args.slice(2).join(' ')}`)

        }
        else if (args[1] === 'description') {
            if (owner !== message.author.id)
                return embedResponse('No puedes cambiar la descripción del chat!')


            if (!args[2] || args.slice(2).length >= 51)
                return embedResponse('Elije una descripción con un nombre menor o igual a 50 caracteres!')


            let regex = args.slice(2).join(' ').match(check);

            if (regex || args.slice(2).join(' ').includes('`'))
                return embedResponse('Esa descripción tiene caracteres no permitidos!')

            await client.updateData({ token: `${args[0]}` }, { description: args.slice(2).join(' ') }, 'chat');

            return embedResponse(`Descripción cambiada a: ${args.slice(2).join(' ')}`)

        }

        else if (args[1] === 'maxusers') {
            if (owner !== message.author.id)
                return embedResponse('No puedes cambiar el maximo de usuarios del chat!')


            if (!parseInt(args[2]) || parseInt(args[2]) >= 51)
                return embedResponse('Elije un maximo de usuarios menor o igual a 50!')

            await client.updateData({ token: `${args[0]}` }, { max: args[2] }, 'chat');

            return embedResponse(`Maximo cambiado a: ${args[2]}`)

        }

        else {
            return embedResponse('Elije una opción entre `name`, `description` o `maxusers`!')

        }
    }
}