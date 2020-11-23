/* eslint-disable no-case-declarations */
const Discord = require("discord.js")

module.exports = {
    config: {
        name: "lista", //nombre del cmd
        alias: [], //Alias
        description: "private command", //Descripción (OPCIONAL)
        usage: "z!lista",
        category: 'utiles',
        botPermissions: [],
        memberPermissions: []
    },
    run: async ({ message, args, client, embedResponse }) => {

        if (!['374710341868847104', '507367752391196682'].includes(message.author.id))
            return;

        switch (args[0]) {

            case 'add':
                if (!args[1]) return embedResponse('Que quieres añadir?')

                let data = await client.updateData({ id: message.author.id }, { $addToSet: { elementos: args.slice(1).join(' ') } }, 'lista')

                return embedResponse('Añadido a la lista... Elementos actuales: ' + data.elementos.length)

            case 'remove':
                if (!args[1]) return embedResponse('Que quieres remover?')

                let data1 = await client.updateData({ id: message.author.id }, { $pull: { elementos: args.slice(1).join(' ') } }, 'lista')

                return embedResponse('Eliminado de la lista... Elementos actuales: ' + data1.elementos.length)

            case 'view':
                let data2 = await client.getData({ id: message.author.id }, 'lista');
                return embedResponse(data2.elementos.join('\n') || 'Lista vacia.')

            default:
                return embedResponse('z!lista <view | add | remove> item')

        }
    }
}