//Después de Alias es opcional.
module.exports = {
    config: {
        name: "shortlink", //nombre del cmd
        alias: [], //Alias
        description: "Acortar un link", //Descripción (OPCIONAL)
        usage: "z!shortlink URL",
        category: 'utiles'
    },
    run: ({ message, args, embedResponse }) => {

        const shorten = require('isgd');
        if (!args[0]) return embedResponse(`Uso correcto:\nz!shortlink <link>`)
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            if (args[0].includes('discord.gg/')) return embedResponse('No puedes poner una invitacion en el comando!')
        }
        if (args[0]) {
            shorten.shorten(args[0], function (res) {
                return embedResponse(`Result:\n${res}`)
            })
        }

    }
}