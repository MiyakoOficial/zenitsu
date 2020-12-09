const Discord = require('discord.js');
module.exports = (client, message, queue, song) => {

    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setThumbnail(song.thumbnail)
        .setAuthor(song.user.tag, song.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setDescription(`Cancion añadida: [${song.name}](${song.url}) - ${song.formattedDuration}`)
    return message.channel.send({ embed: embed })

}