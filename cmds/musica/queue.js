const search = require('youtube-search');
const ytdl = require('ytdl-core');
const Discord = require('discord.js')
module.exports = {
    config: {
        name: "queue",//Nombre del cmd
        alias: ['q'], //Alias
        description: "Ver la cola", //Descripción (OPCIONAL)
        usage: "z!queue",
        category: 'musica'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {
        let { serverQueue } = client;


        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!')
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!')
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para saber la lista!')
        let x = serverQueue.songs.map(a => a.tiempo).reduce((a, b) => a + b);


        let cancionesSeparadas = [];

        function seleccion() {
            let arg = args[0] || 1;
            if (arg < 0) return 1;
            else {
                return parseInt(arg) || 1;
            }
        }
        let s;

        for (let i = 0; i < serverQueue.songs.length; i += 10) {
            cancionesSeparadas.push(serverQueue.songs.slice(i, i + 10));
        }

        if (!cancionesSeparadas[seleccion() - 1]) {
            let embed1 = new Discord.MessageEmbed()
                .setColor(client.color)
                .setTimestamp()
                .setDescription('Pagina inexistente!')
                .setFooter(`Pagina actual: ${seleccion()}`)
            s = embed1
        } else {

            let embed2 = new Discord.MessageEmbed()
                .setColor(client.color)
                .setTimestamp()
                .setDescription(`
        Canciones en cola:

        ${cancionesSeparadas[seleccion() - 1].map((a, num) => `#${num + 1} [${a.title}](${a.url}) - ${a.time} - ${a.author.toString()}`).join('\n')}

        Total de canciones: ${serverQueue.songs.length} | Tiempo total: ${duration(parseInt(x))} | Pagina ${seleccion()} / ${cancionesSeparadas.length}
    `, { split: true })
            s = embed2
        }
        message.channel.send({ embed: s })


    }
}

function duration(segundos) {
    var s = parseInt(segundos) * 1000
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    if (`${secs}`.length === 1) {
        secs = `0${secs}`;
    }

    if (`${mins}`.length === 1) {
        mins = `0${mins}`;
    }

    if (hrs <= 0) {
        if (mins <= 0) {
            return 0 + ':' + secs;
        } else {
            return mins + ":" + secs;
        }
    } else {
        return hrs + ":" + mins + ":" + secs;
    }

};