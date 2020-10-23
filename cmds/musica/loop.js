module.exports = {
    config: {
        name: "loop",//Nombre del cmd
        alias: ['repeat'], //Alias
        description: "Repetir la música",
        usage: "z!loop",
        category: 'musica'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        const Discord = require('discord.js');

        let { duration, queue, serverQueue, color } = client;

        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!')
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!')
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        else {

            serverQueue.loop = !serverQueue.loop

            let res = serverQueue.loop ? 'Activado' : 'Desactivado'

            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para saber la canción que se esta reproduciendo!')
            let embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTimestamp()
                .setDescription(`Loop cambiado a: ${res}`)
            return message.channel.send({ embed: embed })
        };
    }
}