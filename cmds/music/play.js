const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "play", //Nombre del cmd
        alias: ['p'], //Alias
        description: "Reproducir musica", //Descripción (OPCIONAL)
        usage: "z!play musica",
        category: 'musica'
    },
    run: ({ message, client, args, embedResponse }) => {

        let canalVoz = message.member.voice.channel;
        let botCanalVoz = message.guild.me.voice.channel

        let song = args.join(' ');

        if (!canalVoz)
            return embedResponse('<:cancel:779536630041280522> | Necesitas estar en un canal de voz.')
        if (!song)
            return embedResponse('<a:CatLoad:724324015275245568> | Que quieres buscar?')

        if (message.guild.getQueue()) {

            if (canalVoz.id != botCanalVoz?.id)
                return embedResponse('<:cancel:779536630041280522> | Necesitas estar en el mismo canal que yo.')

        }

        let embed = new MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setDescription(`<a:CatLoad:724324015275245568> | Buscando: [ ${client.remplazar(song)} ]`)

        client.distube.play(message, song)
        return message.channel.send({ embed: embed })

    }
}