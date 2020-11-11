//Después de Alias es opcional.
module.exports = {
    config: {
        name: "ping", //nombre del cmd
        alias: ['pong'], //Alias
        description: "Ver la latencia del bot", //Descripción (OPCIONAL)
        usage: "z!ping",
        category: 'bot'
    },
    run: ({ client, embedResponse }) => {

        return embedResponse(`Ping: ${client.ws.ping}ms`);

    }
}