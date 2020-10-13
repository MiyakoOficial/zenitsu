//Después de Alias es opcional.
module.exports = {
    config: {
        name: "ping",//Nombre del cmd
        alias: ['pong'], //Alias
        description: "Ver la latencia del bot", //Descripción (OPCIONAL)
        usage: "z!ping",
        category: 'bot'
    },
    run: async ({ client, message, args, embedResponse }) => {

        return embedResponse(`Ping: ${client.ws.ping}ms`);

    }
}