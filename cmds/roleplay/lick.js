const Discord = require('discord.js');
module.exports = {
    config: {
        name: "lick",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif lamiendo a alguien", //Descripción (OPCIONAL)
        usage: "z!kill @mencion",
        category: 'interacción'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = client.star.lick();

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} lamió a ${miembro.user.toString()}!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}