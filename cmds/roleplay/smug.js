const Discord = require('discord.js');
module.exports = {
    config: {
        name: "smug", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif de presumido", //Descripción (OPCIONAL)
        usage: "z!smug",
        category: 'interacción',
        botPermissions: [],
        memberPermissions: []

    }, run: async ({ client, message }) => {

        let link = (await client.neko.smug()).url

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} se ha puesto a presumir!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}