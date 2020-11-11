const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "djs", //nombre del cmd
        alias: [], //Alias
        description: "Ver la documentacion de djs", //Descripción (OPCIONAL)
        usage: "z!djs",
        category: 'utiles'
    },
    run: async ({ message, args, embedResponse }) => {

        if (!args[0]) return embedResponse('¿Que quieres buscar?');
        let response = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`).catch(() => { });
        if (!response) return embedResponse('Sin resultados.');
        let megadb = await response.json();
        if (!megadb) return embedResponse("No pude encontrarlo en la documentacion de discord.js.")
        message.channel.send({ embed: megadb }).catch(() => { });

    }
};