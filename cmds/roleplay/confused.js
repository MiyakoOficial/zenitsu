const Discord = require('discord.js');
module.exports = {
    config: {
        name: "confused", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif confundido", //Descripción (OPCIONAL)
        usage: "z!confused",
        category: 'interacción'

    }, run: ({ client, message }) => {

        let link = client.star.confused();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} está confundido!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}