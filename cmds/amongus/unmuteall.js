//Después de Alias es opcional.
module.exports = {
    config: {
        name: "unmuteall", //nombre del cmd
        alias: [], //Alias
        description: "Desilencia a todos en el canal de voz", //Descripción (OPCIONAL)
        usage: "z!unmuteall",
        category: 'among us'
    }, run: async ({ client, message }) => {

        let canalVoz = message.member.voice.channel;
        await client.among(message, message.member, canalVoz, message.channel, false)//

    }
}