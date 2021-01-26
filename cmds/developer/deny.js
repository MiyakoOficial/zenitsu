const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "deny"
        this.category = 'developer'
    }
    async run({ client, message, args, embedResponse }) {

        if (!["507367752391196682"].includes(message.author.id))
            return;
        if (!args[0]) return embedResponse('Escribe una ID valida')
        if (!args[1]) return embedResponse('Escribe algo!')

        if (await messageS(args[0]) === false) return embedResponse('No he encontrado ese mensaje!')
        else {
            client.channels.cache.get('727948582556270682').messages.fetch(args[0]).then(a => {
                a.edit(a.embeds[0]
                    .addField('Denegado!', args.slice(1).join(' '))
                    .setColor('RED'))


                return a.react('758000069654872204')
            });
            return embedResponse('Sugerencia denegada!')
        }

        function messageS(id) {
            return new Promise((resolve) => {
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