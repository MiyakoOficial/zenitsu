const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "queue", //Nombre del cmd
        alias: ['q'], //Alias
        description: "Ver la cola de reproduccion", //Descripción (OPCIONAL)
        usage: "z!queue",
        category: 'musica'
    },
    run: ({ message, client, args, embedResponse }) => {
        if (message.author.id !== '507367752391196682')
            return;

    }
}