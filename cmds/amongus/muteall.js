//Después de Alias es opcional.
module.exports = {
    config: {
        name: "muteall", //nombre del cmd
        alias: [], //Alias
        description: "Silenciar a todos en el canal de voz", //Descripción (OPCIONAL)
        usage: "z!muteall",
        category: 'among us',
        botPermissions: [],
        memberPermissions: []
    }, run: async ({ client, message, }) => {

        let canalVoz = message.member.voice.channel;
        return await client.among(message, message.member, canalVoz, message.channel, true)//

    }
}