const Discord = require('discord.js');
module.exports = (client, player, track) => {
    const song = track
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setThumbnail(song.thumbnail)
        .setDescription(`<:accept:779536642365063189> | Cancion *\`añadida:\`* [${client.remplazar(song.title)}](${song.uri}) - ${song.isStream ? 'LIVE' : client.newDate(song.duration)}`)
        .setFooter(song.message.author.tag, song.message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    song.message.channel.send({ embed: embed })
}