const Discord = require('discord.js');

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */

module.exports = (client, message, queue, playlist, song) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor('Reproduciendo ahora ' + song.name + ' - ' + song.formattedDuration, song.thumbnail, song.url)
        .setColor(client.color)
        .setThumbnail(playlist.thumbnail)
        .setDescription(`Playlist [${playlist.name}](${playlist.url}) reproduciendose.`)
        .setFooter(song.user.tag, song.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setTimestamp()
    message.channel.send({ embed: embed })
}