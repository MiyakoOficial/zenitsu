const { MessageEmbed } = require("discord.js");
//wtf x
module.exports = {
    config: {
        name: "play", //Nombre del cmd
        alias: ['p'], //Alias
        description: "Reproducir musica", //Descripción (OPCIONAL)
        usage: "z!play musica",
        category: 'musica'
    },
    run: async ({ message, client, args, embedResponse }) => {

        let canalVoz = message.member.voice.channel;
        let botCanalVoz = message.guild.me.voice.channel

        let song = args.join(' ');

        if (!canalVoz)
            return embedResponse('<:cancel:779536630041280522> | Necesitas estar en un canal de voz.')
        if (!song)
            return embedResponse('<a:CatLoad:724324015275245568> | ¿Que quieres buscar?')

        if (message.guild.player()) {

            if (canalVoz.id != botCanalVoz?.id)
                return embedResponse('<:cancel:779536630041280522> | Necesitas estar en el mismo canal que yo.')

        }

        let embed = new MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setDescription(`<a:CatLoad:724324015275245568> | Buscando: [ ${client.remplazar(song)} ]`)
        message.channel.send({ embed: embed })
        const res = await client.erela.search(args.join(' '), message.author);
        const player = client.erela.create({
            guild: message.guild.id,
            voiceChannel: canalVoz.id,
            textChannel: message.channel.id,
            selfDeafen: true
        })

        if (!res || !res.tracks || !res.tracks.length)
            return embedResponse('<:cancel:779536630041280522> | Sin resultados.')
        player.connect();
        res.tracks.map(a => a.message = message)
        if (res.loadType == 'PLAYLIST_LOADED') {
            res.tracks.map(a => a.fromPlaylist = true);
            res.tracks.map(a => player.queue.add(a));
            embedResponse(`Playlist *\`añadida\`*: [${res.playlist.name}](${song})`)
            if (!player.playing && !player.paused)
                player.play();
        } else {
            player.queue.add(res.tracks[0]);
            if (player.queue.size >= 1) {
                message.channel.send(`Añadiendo a la cola: ${res.tracks[0].title}`)
            }
            if (!player.playing && !player.paused && !player.queue.size)
                player.play();
        }

    }
}