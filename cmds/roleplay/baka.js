const Discord = require('discord.js');
module.exports = {
    config: {
        name: "baka",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif de la expresion 'baka'", //Descripción (OPCIONAL)
        usage: "z!baka @mencion",
        category: 'interacción'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = (await client.neko.baka()).url
        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`>-< ${miembro.user.toString()} baka!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}