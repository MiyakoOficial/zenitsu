module.exports = {
    config: {
        name: "np",//Nombre del cmd
        alias: ['nowplaying'], //Alias
        description: "Ver la música que se está reproduciendo.", //Descripción (OPCIONAL)
        usage: 'z!np',
        category: 'musica'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        const Discord = require('discord.js');

        let { duration, queue, serverQueue, color } = client;

        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!')
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!')
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (!serverQueue.connection.dispatcher) return embedResponse('Oh, algo extraño sucedio...')
        else {

            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para saber la canción que se esta reproduciendo!')
            let embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTimestamp()
                .setAuthor(`Reproduciendo ahora:`)
                .setThumbnail('https://media.tenor.com/images/84a791e6d9f96e3d203efc9041ba379d/tenor.gif')
                .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) - ${serverQueue.songs[0].author.toString()}`)
                .setFooter(`${duration(Math.trunc(serverQueue.connection.dispatcher.streamTime / 1000))} / ${serverQueue.songs[0].time}`)
            return message.channel.send({ embed: embed })

        };

    }
}