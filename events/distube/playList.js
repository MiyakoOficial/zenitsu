const Discord = require('discord.js');
const { shadow } = require('jimp');

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */
module.exports = async (client, message, queue, playlist, song) => {

    const { shorten } = require('isgd');

    const short = require('util').promisify(shorten)

    let url = await short(playlist.url).catch(e => e)

    queue.songs.map(a => {
        a.fromPlaylist = true;
        a.fromPlaylistURL = url;
    })
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setThumbnail(playlist.thumbnail)
        .setAuthor(song.name, song.thumbnail, song.url)
        .setDescription(`Playlist [${client.remplazar(playlist.name)}](${playlist.url})  *\`reproduciendose\`* (${playlist.songs.length} canciones).`)
        .setTimestamp()
        .setFooter(song.user.tag, song.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.channel.send({ embed: embed })
}