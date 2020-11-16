module.exports = {
    config: {
        name: "ticket", //nombre del cmd
        alias: [], //Alias
        description: "Abrir un ticket", //Descripción (OPCIONAL)
        usage: "z!ticket",
        category: 'servidor'
    },
    run: ({ message, args, embedResponse }) => {

        let canalCheck = message.guild.channels.cache.find(a => a.name === `ticket-${message.author.id}`);

        if (canalCheck)
            return embedResponse('Ya tienes un ticket creado.')

        let razon = args.join(' ') || 'No especificada.'

        return message.guild.channels.create('ticket-' + message.author.id, {
            parent: '777876208117350401', //zenitsu-tickets
            permissionOverwrites: [
                {
                    id: '649011203791912981', //rol miembros
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: message.author.id, //usuario
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS']
                },
                {
                    id: '649015467591335959', //rol de soporte
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS']
                }
            ],
        }).then(a => {
            a.send(`>>> Hola ${message.author.toString()}, espera que un staff venga a ayudarte.\nRazon de ticket: ${razon}`)
        });

    }
};