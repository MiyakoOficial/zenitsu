const Discord = require('discord.js');
module.exports = (client, message, queue, song) => {

    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setThumbnail(song.thumbnail)
        .setDescription(`<:accept:779536642365063189> | Cancion *\`añadida:\`* [${song.name}](${song.url}) - ${song.formattedDuration}`)
        .setFooter(song.user.tag, song.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.channel.send({ embed: embed })

}