const Discord = require('discord.js');
module.exports = {
    config: {
        name: "poke", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif tocando a alguien.", //Descripción (OPCIONAL)
        usage: "z!poke @mencion",
        category: 'interacción'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let link = (await client.neko.poke()).url
        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} está molestando a ${miembro.user.toString()}!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}