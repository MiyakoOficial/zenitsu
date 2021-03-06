
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "ping"
        this.alias = ['pong']
        this.category = 'bot'
    }
    async run({ client, message }) {

        const Discord = require('discord.js');

        let date = Date.now();
        let ping_db = await new Promise((r, j) => {
            require('mongoose').connection.db.admin().ping((err, result) => (err || !result) ? j(err || result) : r(Date.now() - date))
        });

        date = Date.now();

        let pong = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor(client.color)
            .setDescription('Pong?')

        return message.channel.send({ embed: pong })
            .then(msg => {

                let embed = new Discord.MessageEmbed()
                    .setDescription(`š Bot: ${client.ws.ping}ms [${getStatus(client.ws.ping)}]\nš” Discord API: ${Date.now() - date}ms [${getStatus(Date.now() - date)}]\nšļø DB: ${ping_db}ms [${getStatus(ping_db)}]`)
                    .setTimestamp()
                    .setColor(client.color)

                return msg.edit({ embed })

            })
    }
}


/**
 * @param {Number} number 
 * @returns {String}
 * @example
 * getStatus(200) //š 
 */

function getStatus(number) {

    let color = '';
    if (number >= 400) color = `ā«`
    else if (number >= 300) color = `š“`
    else if (number >= 200) color = `š `
    else if (number >= 100) color = `š”`
    else color = `š¢`
    return `\\${color}`

}