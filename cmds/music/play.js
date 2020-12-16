const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "play", //Nombre del cmd
        alias: ['p'], //Alias
        description: "Reproducir musica", //Descripción (OPCIONAL)
        usage: "z!play musica",
        category: 'musica'
    },
    run: ({ message, client, args, embedResponse }) => {
        if (message.author.id !== '507367752391196682')
            return;

    }
}