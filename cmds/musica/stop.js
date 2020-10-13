module.exports = {
    config: {
        name: "stop",//Nombre del cmd
        alias: [], //Alias
        description: "Eliminar la cola", //Descripción (OPCIONAL)
        usage: "z!stop",
        category: 'musica'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let { queue, serverQueue } = client;

        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!')
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!')
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!')
        else {
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para detener la lista!')
            queue.delete(message.guild.id)
            message.guild.me.voice.channel.leave()
            embedResponse('Cola de reproducción eliminada.')
        }

    }
}