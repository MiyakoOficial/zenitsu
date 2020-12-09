const Discord = require('discord.js');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */
module.exports = (client, message, queue, song) => {
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setThumbnail(song.thumbnail)
        .setFooter(song.user.tag, song.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setDescription(`Reproduciendo ahora: [${song.name}](${song.url}) - ${song.formattedDuration}`)
    return message.channel.send({ embed: embed })
}