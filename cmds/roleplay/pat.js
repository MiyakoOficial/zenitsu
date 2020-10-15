const Discord = require('discord.js');
module.exports = {
    config: {
        name: "pat",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif acariciando a alguien.", //Descripción (OPCIONAL)
        usage: "z!pat @mencion",
        category: 'interacción'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = client.star.pat();
        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} está acariciando a ${miembro.user.toString()}!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}