const Discord = require('discord.js');
module.exports = {
    config: {
        name: "dance",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif bailando", //Descripción (OPCIONAL)
        usage: "z!dance",
        category: 'interacción'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = client.tnai.sfw.dance();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} se ha puesto a bailar!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}