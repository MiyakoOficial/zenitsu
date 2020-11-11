const Discord = require('discord.js');
module.exports = {
    config: {
        name: "blush", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif sonrojado", //Descripción (OPCIONAL)
        usage: "z!blush",
        category: 'interacción'

    }, run: ({ client, message }) => {

        let link = client.star.blush();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} se sonrojó!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}