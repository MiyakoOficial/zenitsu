const Discord = require('discord.js');

module.exports = {
    config: {
        name: "snipe", //nombre del cmd
        alias: [], //Alias
        description: "Ver el ultimo mensaje borrado", //Descripción (OPCIONAL)
        usage: "z!snipe #mention",
        category: 'utiles'
    },
    run: async ({ client, message, embedResponse }) => {

        let canal = message.mentions.channels.first() || message.channel;

        let data = (await client.getData({ id: canal.id }, 'snipe'))

        if (!data || !data.mensaje) return embedResponse("Ningun mensaje ha sido borrado en este canal.")

        let embed = new Discord.MessageEmbed()
            .setDescription(data.mensaje)
            .setAuthor(data.nombre, data.avatarURL)
            .setColor(client.color)
            .setTimestamp()
            .setTitle('Snipe')
            .setThumbnail('https://media1.tenor.com/images/8c3e8a0a3c7b0afc22624c9278be6a89/tenor.gif?itemid=5489827')
        return message.channel.send({ embed: embed }).catch(() => { })

    }
}
