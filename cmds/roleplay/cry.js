const Discord = require('discord.js');
module.exports = {
    config: {
        name: "cry",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif llorando", //Descripción (OPCIONAL)
        usage: "z!cry",
        category: 'roleplay'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = client.star.cry();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} se ha puesto a llorar!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}