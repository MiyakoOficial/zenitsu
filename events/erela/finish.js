const Discord = require('discord.js');

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */

module.exports = (client, message) => {
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setDescription('<a:baimefui:787148055421517845> | Termine de reproducir la musica, Adios!')
    message.channel.send({ embed: embed })
}