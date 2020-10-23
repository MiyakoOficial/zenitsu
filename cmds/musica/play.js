const search = require('youtube-search');
const ytdl = require('discord-ytdl-core');
//const ytdl = require('ytdl-core');
const yts = require('yt-search')
const Discord = require('discord.js');
const { parse } = require('path');

function timestampToSeconds(time) {
    const toMilliseconds = require("@sindresorhus/to-milliseconds");
    const arr = time.split(":");
    if (arr.every(s => !isNaN(s))) {
        const final = arr.reverse();
        return toMilliseconds({
            seconds: parseInt(final[0]) || 0,
            minutes: parseInt(final[1]) || 0,
            hours: parseInt(final[2]) || 0,
            days: parseInt(final[3]) || 0
        }) / 1000;
    } else throw new Error("Uno de los parámetros en el string no es un número");

}

module.exports = {
    config: {
        name: "play",//Nombre del cmd
        alias: ['p'], //Alias
        description: "Escuchar música", //Descripción (OPCIONAL)
        usage: "z!play musica",
        category: 'musica'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let song;

        //console.log('a')

        let { serverQueue } = client;
        if (!message.member.voice.channel) return embedResponse('Necesitas estar en un canal de voz!')
        if (!message.member.voice.channel.permissionsFor(message.client.user).has('CONNECT')) return embedResponse('No puedo unirme a ese canal de voz!')
        if (!message.member.voice.channel.permissionsFor(message.client.user).has('SPEAK')) return embedResponse('No puedo hablar en ese canal de voz!')
        if (!args[0]) return embedResponse('Escribe algo!')
        await embedResponse(`Buscando: ||${client.remplazar(args.join(' '))}||`);

        const ytpl = require('ytpl');
        const y = await ytpl(args.join(' ')).catch(err => { });

        if (y && y.items) {

            song = [];

            for await (let s of y.items) {
                if (s.duration) {
                    let obj = {
                        title: s.title,
                        url: s.url_simple,
                        time: s.duration,
                        author: message.author,
                        tiempo: parseInt(timestampToSeconds(`${s.duration}`))
                    }

                    song.push(obj);
                }

                if (song.length == 0)
                    return embedResponse('Creo que esta playlist es privada!');
            };

        } else {

            const usetube = require('usetube');

            let { tracks } = await usetube.searchVideo(args.join(' '));

            if (!tracks || !tracks[0])
                return embedResponse('No encontre esa cancion.')

            let track = tracks[0];

            song = {
                title: track.title,
                url: `https://www.youtube.com/watch?v=${track.id}`,
                time: track.duration == '' || track.duration == 0 ? 'LIVE' : track.duration,
                author: message.author,
                tiempo: track.duration == '' || !track.duration ? 0 : parseInt(timestampToSeconds(track.duration))
            }

            console.log(song)
        }
        if (!serverQueue) {
            const queueObject = {
                textChannel: message.channel,
                voiceChannel: message.member.voice.channel,
                connection: null,
                songs: [],
                volume: 5,
                loop: false
            }
            client.queue.set(message.guild.id, queueObject)
            if (Array.isArray(song)) {

                song.forEach(async (s) => {

                    queueObject.songs.push(s);

                })

            } else {
                queueObject.songs.push(song)
            }
            try {
                let connection = await message.member.voice.channel.join()
                queueObject.connection = connection;
                play(message.guild, queueObject.songs[0])
            } catch (err) {
                client.queue.delete(message.guild.id)
                return message.channel.send('Error: ' + err)
            }
            if (Array.isArray(song)) {
                embedResponse(`Reproduciendo: [${song[0].title}](${song[0].url}) - ${song[0].time} - ${song[0].author.toString()}`)
            }
            else {
                embedResponse(`Reproduciendo: [${song.title}](${song.url}) - ${song.time} - ${song.author.toString()}`)
            }
        }

        else {
            if (serverQueue.songs.length === 0 || !message.guild.me.voice.channel) {
                embedResponse('Reiniciando la cola!\nIntente de nuevo!')
                return client.queue.delete(message.guild.id)
            } else {
                if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para agregar una canción!')
                if (Array.isArray(song)) {

                    song.forEach(async (s) => {

                        serverQueue.songs.push(s);

                    })
                    embedResponse('Añadiendo a la cola ' + song.length + " canciones!")
                } else {
                    serverQueue.songs.push(song)
                    embedResponse(`Añadiendo a la cola: [${song.title}](${song.url}) - ${song.time} - ${song.author.toString()}`)
                }
            }
        }

        function embedMusic(argumentoDeLaDescripcion, opcion) {
            let canal_a_enviar = opcion
            return canal_a_enviar.send({
                embed: new Discord.MessageEmbed()
                    .setDescription(argumentoDeLaDescripcion)
                    .setColor(client.color)
                    .setImage('https://cdn.discordapp.com/attachments/632098744262721564/633640689955110912/nitro.gif')
                    .setTimestamp()
            })
        }

        function play(guild, song) {
            const serverQueue = client.queue.get(guild.id);
            if (!song) {
                serverQueue.voiceChannel.leave();
                client.queue.delete(guild.id);
                return;
            } try {
                const stream = ytdl(song.url, {
                    opusEncoded: true, //Discord
                    filter: "audioonly", //Sólo audio
                    highWaterMark: 1 << 25 //Bug de Node 12
                });
                // if (serverQueue.songs.length=== 0) return serverQueue.textChannel.send('Lista de reproducción acabada.');
                const dispatcher = serverQueue.connection.play(stream, { type: "opus" })
                    .on('finish', () => {
                        if (serverQueue.loop) {
                            serverQueue.songs.push(serverQueue.songs.shift())
                        }
                        else {
                            serverQueue.songs.shift();
                        }

                        play(guild, serverQueue.songs[0]);
                        if (!serverQueue.songs[0]) return;
                        embedMusic(`Reproduciendo: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) - ${serverQueue.songs[0].time} - ${serverQueue.songs[0].author.toString()}`, serverQueue.textChannel)
                    })
                    .on('error', async error => {
                        await serverQueue.textChannel.send(`Error:\n${error}`)
                        client.queue.delete(guild.id);
                    });
                dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            } catch (e) { }
        }
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
    };

    if (`${mins}`.length === 1) {
        mins = `0${mins}`;
    };

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