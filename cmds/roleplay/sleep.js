const Discord = require('discord.js');
module.exports = {
    config: {
        name: "sleep",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif durmiendo", //Descripción (OPCIONAL)
        usage: "z!sleep",
        category: 'roleplay'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = client.star.sleep();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} está durmiendo!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}