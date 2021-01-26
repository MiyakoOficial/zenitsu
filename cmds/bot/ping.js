//Después de Alias es opcional.
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "ping"
        this.alias = ['pong']
        this.category = 'bot'
    }
    run({ client, embedResponse }) {
        let date = Date.now();
        return embedResponse(`Pong?`)
            .then(msg => msg.edit(msg.embeds[0].setDescription(`🏓 Bot: ${client.ws.ping}ms\n📡 Discord API: ${Date.now() - date}ms`)));
    }
}