const Discord = require('discord.js');
/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */
module.exports = (client, player, tracks, playlist) => {
    /*
        const { shorten } = require('isgd');
    
        const short = require('util').promisify(shorten)
    
        let url = await short(playlist.uri).catch(e => e)
    */
    let song = tracks[0];
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setThumbnail(playlist.thumbnail)
        .setAuthor(song.name, song.thumbnail, song.url)
        .setDescription(`Playlist [${client.remplazar(playlist.name)}](${playlist.uri})  *\`añadida\`* (${tracks.length} canciones).`)
        .setTimestamp()
        .setFooter(song.message.author.tag, song.message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    tracks[0].message.channel.send({ embed: embed })
}