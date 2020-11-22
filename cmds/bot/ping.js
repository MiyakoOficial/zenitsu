//Después de Alias es opcional.
module.exports = {
    config: {
        name: "ping", //nombre del cmd
        alias: ['pong'], //Alias
        description: "Ver la latencia del bot", //Descripción (OPCIONAL)
        usage: "z!ping",
        category: 'bot',
        botPermissions: [],
        memberPermissions: []
    },
    run: ({ client, embedResponse }) => {
        let date = Date.now();
        return embedResponse(`Pong?`)
            .then(msg => msg.edit(msg.embeds[0].setDescription(`🏓 Bot: ${client.ws.ping}ms\n📡 Discord API: ${Date.now() - date}ms`)));

    }
}