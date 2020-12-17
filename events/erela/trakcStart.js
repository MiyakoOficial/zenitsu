const Discord = require('discord.js');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */
module.exports = (client, player, track) => {
    let { kaomojis } = client;

    let kaomoji = kaomojis[Math.floor(Math.random() * kaomojis.length)];
    const song = track
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setFooter(song.message.author.tag, song.message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setTimestamp()
        .setAuthor(kaomoji, 'https://media1.tenor.com/images/869a5e483261d0b8e4f296b1152cba8e/tenor.gif?itemid=15940704')
        .setDescription(`*\`Reproduciendo ahora:\`*
            [${song.fromPlaylist ? `<:mc_song:786660726914678834>` : '<a:songDJ:786662120388296724>'}] [${song.title}](${song.uri})
            *\`Informacion:\`*
            <a:frog_rotate:720984862231887883> | Modo de repeticion: ${player.trackRepeat ? 'Cancion' : player.queueRepeat ? 'Cola' : 'Ninguno'}
            <a:REEEEEEEEEEEEE:787117184777584640> | Volumen: ${player.volume}%
            <a:CatLoad:724324015275245568> | Duracion: ${song.isStream ? 'LIVE' : client.newDate(song.duration)}
            `)
    song.thumbnail ? embed.setThumbnail(song.thumbnail) : null

    client.channels.cache
        .get(player.textChannel)
        .send({ embed: embed })

}