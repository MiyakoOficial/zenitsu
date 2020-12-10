const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "np", //Nombre del cmd
        alias: ['nowplaying'], //Alias
        description: "Ver la cancion que se esta reproduciendo", //Descripción (OPCIONAL)
        usage: "z!np",
        category: 'musica'
    },
    run: ({ message, client, args, embedResponse }) => {

        let data = message.guild.getQueue();

        if (!data || !data.dispatcher || !data.dispatcher.streamTime)
            return embedResponse('Ninguna cancion se esta reproduciendo.')
        const createBar = require('string-progressbar');
        let total = data.songs[0].duration;
        let current = data.dispatcher.streamTime >= 1000 ? Math.floor(data.dispatcher.streamTime / 1000) : 1;
        let size = 50;
        let slider = "[]"
        let line = "▬"
        console.log(total, current)
        let res = createBar(total, current, size, line, slider)[0]

        let embed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor(data.songs[0].name, '#', data.songs[0].url)
            .setThumbnail(data.songs[0].thumbnail)
            .setDescription(`[\`${res}\`]`)
            .setFooter(`Puesta por: ${data.songs[0].user.tag}`, data.songs[0].user.displayAvatarURL({ dynamic: true, size: 2048 }))

        message.channel.send({ embed: embed })

    }
}