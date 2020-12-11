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
        .setAuthor('Reproduciendo ahora', 'https://media1.tenor.com/images/18a006ba771a888cd82e34a84e8b5ed7/tenor.gif?itemid=11366262')
        .setFooter(song.user.tag, song.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setDescription(`[${song.name}](${song.url}) - ${song.formattedDuration}`)
    message.channel.send({ embed: embed })
}