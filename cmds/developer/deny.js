const Discord = require("discord.js")

module.exports = {
    config: {
        name: "deny",
        alias: [],
        description: "Denegar sugerencia",
        usage: "z!accept id comment",
        category: 'developer'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!["507367752391196682"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!')
        if (!args[0]) return embedResponse('Escribe una ID valida')
        if (!args[1]) return embedResponse('Escribe algo!')

        if (await messageS(args[0]) === false) return embedResponse('No he encontrado ese mensaje!')
        else {
            client.channels.cache.get('727948582556270682').messages.fetch(args[0]).then(a => {
                a.edit(a.embeds[0]
                    .addField('Denegado!', args.slice(1).join(' '))
                    .setColor('RED'))


                return a.react('721174460073377804')
            });
            return embedResponse('Sugerencia denegada!')
        }

        async function messageS(id) {
            return new Promise((resolve, reject) => {
                client.channels.cache.get('727948582556270682').messages.fetch(id)
                    .then(() => {
                        return resolve(true);
                    })
                    .catch(() => {
                        return resolve(false);
                    })
            })
        }

    }
}