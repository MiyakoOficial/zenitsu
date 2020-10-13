module.exports = {
    config: {
        name: "volume",//Nombre del cmd
        alias: ['v', 'vl', 'volumen'], //Alias
        description: "Cambiar el volumen de la música.", //Descripción (OPCIONAL)
        usage: "z!volume",
        category: 'musica'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let { serverQueue, queue } = client;

        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!')
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!')
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        else {
            if (isNaN(args.join(' '))) return embedResponse('Pon un numero valido!')
            if (parseInt(args.join(' ')) > 100 || args.join(' ') < 1) return embedResponse('Elije un numero del 1 al 100')
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para cambiar el volumen!')

            serverQueue.volume = Math.floor(parseInt(args.join(' ')));
            serverQueue.connection.dispatcher.setVolumeLogarithmic(Math.floor(parseInt(args.join(' '))) / 5);
            embedResponse(`Cambiado a: ${Math.floor(parseInt(args.join(' ')))}% `)

        }

    }

}
