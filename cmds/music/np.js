const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "np", //Nombre del cmd
        alias: ['nowplaying'], //Alias
        description: "Ver la cancion que se esta reproduciendo", //Descripción (OPCIONAL)
        usage: "z!np",
        category: 'musica'
    },
    run: ({ message, client, embedResponse }) => {

        let data = message.guild.player();

        if (!data || !data.playing || !data.queue || !data.queue.current)
            return embedResponse('<:cancel:779536630041280522> | Ninguna cancion se esta reproduciendo.')

        let res;

        if (!data.queue.current.isStream) {
            const createBar = require('string-progressbar');
            let total = data.queue.current.duration / 1000;
            let current = data.position >= 1000 ? Math.floor(data.position / 1000) : 1;
            let size = 40;
            let slider = "[]"
            let line = "▬"
            console.log(total, current)
            res = createBar(total, current, size, line, slider)[0]
        }

        if (!res)
            res = 'LIVE'

        let embed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor(data.queue.current.title, 'https://media1.tenor.com/images/869a5e483261d0b8e4f296b1152cba8e/tenor.gif?itemid=15940704', data.queue.current.uri)
            .setThumbnail(data.queue.current.thumbnail)
            .setDescription(`${`[${data.queue.current.isStream ? '<a:frog_rotate:720984862231887883>' : data.queue.current.fromPlaylist ? `<:mc_song:786660726914678834>` : '<a:songDJ:786662120388296724>'}]`}[\`${res}\`]${data.queue.current.isStream ? '' : `\n${client.newDate(data.position)}/${client.newDate(data.queue.current.duration)}`}`)
            .setFooter(`Puesta por: ${data.queue.current.message.author.tag}`, data.queue.current.message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

        message.channel.send({ embed: embed })

    }
}