//Después de Alias es opcional.
module.exports = {
    config: {
        name: "shortlink", //nombre del cmd
        alias: [], //Alias
        description: "Acortar un link", //Descripción (OPCIONAL)
        usage: "z!shortlink URL",
        category: 'utiles',
        botPermissions: [],
        memberPermissions: []
    },
    run: ({ message, args, embedResponse }) => {

        const shorten = require('isgd');
        if (!args[0]) return embedResponse(`<:cancel:779536630041280522> | Uso correcto del comando: z!shortlink <link>`)
        if (args[0].includes('discord.gg/')) return embedResponse('No puedes poner una invitacion en el comando!')
        if (args[0]) {
            shorten.shorten(args[0], function (res) {
                return embedResponse(`Resultado:\n${res}`)
            })
        }

    }
}