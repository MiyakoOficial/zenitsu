const Discord = require("discord.js")

module.exports = {
    config: {
        name: "reportbug",
        alias: [],
        description: "reportar algun bot del bot",
        usage: "z!reportbug bug ocurrido",
        category: 'bot'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!args[0]) return embedResponse('Escribe algo!')
        return embedResponse(`${message.author.tag}(${message.author.id}) reportó:\n\n${args.join(' ')}`.slice(0, 2048), client.channels.cache.get('725053091522805787')).then(a => {
            return embedResponse('Reporte enviado!');
        })
    }
}