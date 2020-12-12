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
        .setDescription(`*\`Reproduciendo ahora:\`*
        [${song.fromPlaylist ? `<:mc_song:786660726914678834>` : '<a:songDJ:786662120388296724>'}] [${song.name}](${song.url})
        <a:frog_rotate:720984862231887883> | Modo de repeticion: ${queue.repeatMode == 0 ? 'Ninguno' : queue.repeatMode == 1 ? 'Cancion' : 'Cola'}
        <a:REEEEEEEEEEEEE:787117184777584640> | Volumen: ${queue.volume}%
        <a:CatLoad:724324015275245568> | Duracion: ${song.formattedDuration}
        `)

    message.channel.send({ embed: embed })
}