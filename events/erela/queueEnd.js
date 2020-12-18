const Discord = require('discord.js');

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */

module.exports = (client, player) => {
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setDescription('<a:baimefui:787148055421517845> | Termine de reproducir la musica, Adios!')
    let canal = client.channels.cache
        .get(player.textChannel)
    canal ? canal.send({ embed: embed }) : null
    player.destroy();
}