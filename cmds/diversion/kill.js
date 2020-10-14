const Discord = require('discord.js');
module.exports = {
    config: {
        name: "kill",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif golpeando hasta ... a alguien", //Descripción (OPCIONAL)
        usage: "z!kill @mencion",
        category: 'diversion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = client.star.kill();

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} mató a ${miembro.user.toString()}!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}