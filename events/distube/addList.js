const Discord = require('discord.js');

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */

module.exports = (client, message, queue, playlist, song) => {
    console.log(playlist)
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setThumbnail(playlist.thumbnail)
        .setAuthor(playlist.songs[0].name, playlist.songs[0].thumbnail, playlist.songs[0].url)
        .setDescription(`Playlist [${playlist.name}](${playlist.url}) añadida (${playlist.songs.length} canciones).`)
        .setTimestamp()
        .setFooter(playlist.songs[0].user.tag, playlist.songs[0].user.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.channel.send({ embed: embed })
}