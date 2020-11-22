const Discord = require('discord.js');
module.exports = {
    config: {
        name: "happy", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif feliz", //Descripción (OPCIONAL)
        usage: "z!happy",
        category: 'interacción',
        botPermissions: [],
        memberPermissions: []

    }, run: ({ client, message }) => {

        let link = client.star.happy();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} se ha puesto feliz!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}