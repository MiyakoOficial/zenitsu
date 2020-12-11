const Discord = require('discord.js');

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */

const { shorten } = require('isgd');

module.exports = async (client, message, queue, playlist) => {

    const short = require('util').promisify(shorten);

    let url = await short(playlist.url)

    queue.songs.map(a => {
        a.fromPlaylist = true;
        a.fromPlaylistURL = url;
        return true;
    })
    let song = playlist.songs[0];
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setThumbnail(playlist.thumbnail)
        .setAuthor(song.name, song.thumbnail, song.url)
        .setDescription(`Playlist [${client.remplazar(playlist.name)}](${playlist.url})  *\`añadida\`* (${playlist.songs.length} canciones).`)
        .setTimestamp()
        .setFooter(song.user.tag, song.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.channel.send({ embed: embed })
}