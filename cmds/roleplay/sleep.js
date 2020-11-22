const Discord = require('discord.js');
module.exports = {
    config: {
        name: "sleep", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif durmiendo", //Descripción (OPCIONAL)
        usage: "z!sleep",
        category: 'interacción',
        botPermissions: [],
        memberPermissions: []

    }, run: ({ client, message }) => {

        let link = client.star.sleep();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} está durmiendo!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}