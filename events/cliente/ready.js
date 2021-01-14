// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Client } = require('discord.js');
const ms = require('ms')

/**
 * 
 * @param {Client} client 
 */

module.exports = (client) => {
    client.color = '#E09E36';
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "z!help | " + client.guilds.cache.size + " servidores",
            type: "WATCHING"
        }
    });
    setInterval(async () => {
        let canal = client.channels.cache.get('786997292040847401');
        let mensaje = await canal.messages.fetch('786997341998678056')
        let embed = new MessageEmbed()
            .setColor(client.color)
            .addField('Servidores', client.guilds.cache.size, true)
            .addField('Usuarios en cache', client.users.cache.filter(a => !a.bot).size, true)
            .addField('Conexiones de voz', client.voice.connections.size, true)
        mensaje.edit({ embed: embed })
    }, ms('5m'));
};