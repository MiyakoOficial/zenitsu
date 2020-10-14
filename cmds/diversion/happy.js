const Discord = require('discord.js');
module.exports = {
    config: {
        name: "happy",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif feliz", //Descripción (OPCIONAL)
        usage: "z!happy",
        category: 'diversion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = client.star.happy();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} se ha puesto feliz!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}