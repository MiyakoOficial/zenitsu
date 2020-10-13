const Discord = require('discord.js');
module.exports = {
    config: {
        name: "tickle",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif haciendo cosquillas", //Descripción (OPCIONAL)
        usage: "z!tickle @mencion",
        category: 'diversion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = (await client.neko.tickle()).url

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} le está haciendo cosquillas a ${miembro.user.toString()}!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}