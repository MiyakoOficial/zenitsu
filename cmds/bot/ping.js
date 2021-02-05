//Después de Alias es opcional.
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "ping"
        this.alias = ['pong']
        this.category = 'bot'
    }
    async run({ client, embedResponse }) {

        let date = Date.now();
        let ping_db = await new Promise((r, j) => {
            require('mongoose').connection.db.admin().ping((err, result) => (err || !result) ? j(err || result) : r(Date.now() - date))
        })
        return embedResponse(`Pong?`)
            .then(msg => msg.edit(msg.embeds[0].setDescription(`🏓 Bot: ${client.ws.ping}ms\n📡 Discord API: ${Date.now() - date}ms\n🗃️ DB: ${ping_db}ms`)));
    }
}