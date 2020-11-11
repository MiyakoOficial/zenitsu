const Discord = require('discord.js');
module.exports = {
    config: {
        name: "slap", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif golpeando a alguien", //Descripción (OPCIONAL)
        usage: "z!slap @mencion",
        category: 'interacción'

    }, run: async ({ client, message, embedResponse }) => {

        let link = (await client.neko.slap()).url

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} golpeó a ${miembro.user.toString()}!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}