module.exports = {
    config: {
        name: "skip",//Nombre del cmd
        alias: ['s', 'sk'], //Alias
        description: "Saltar a la siguiente canción", //Descripción (OPCIONAL)
        usage: "z!skip",
        category: 'musica'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let { queue, serverQueue } = client;

        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!')
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!')
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (serverQueue.songs.length <= 1) return embedResponse('Nada que saltar por aca!')
        else {
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para saltar la canción!')
            serverQueue.connection.dispatcher.end()
            return embedResponse('Saltando a la siguiente música!')
        }


    }
}