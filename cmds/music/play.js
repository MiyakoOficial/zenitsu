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
        if (message.author.id !== '507367752391196682')
            return;
        const canalVoz = message.member.voice.channel;
        if (!canalVoz)
            return message.channel.send('Necesitas estar en un canal de voz.')
        const res = await client.erela.search(args.join(' '), message.author);
        const player = client.erela.create({
            guild: message.guild.id,
            voiceChannel: canalVoz.id,
            textChannel: message.channel.id,
            selfDeafen: true
        })

        player.connect();
        console.log(res.tracks)
        player.queue.add(res.tracks[0])
        message.channel.send(`Reproduciendo: ${res.tracks[0].title}`)

        if (!player.playing && !player.paused && !player.queue.size)
            player.play();



    }
}