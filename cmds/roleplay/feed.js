const Discord = require('discord.js');
module.exports = {
    config: {
        name: "feed", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif alimentando a alguien", //Descripción (OPCIONAL)
        usage: "z!feed @mencion",
        category: 'interacción',
        botPermissions: [],
        memberPermissions: []

    }, run: ({ client, message, embedResponse }) => {

        let link = client.star.feed();

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} alimentó a ${miembro.user.toString()}!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}