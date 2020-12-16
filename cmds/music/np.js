const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "np", //Nombre del cmd
        alias: ['nowplaying'], //Alias
        description: "Ver la cancion que se esta reproduciendo", //Descripción (OPCIONAL)
        usage: "z!np",
        category: 'musica'
    },
    run: ({ message, client, embedResponse }) => {

        if (message.author.id !== '507367752391196682')
            return;

    }
}