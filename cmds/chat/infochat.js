const Discord = require("discord.js")

module.exports = {
    config: {
        name: "infochat",
        alias: [],
        description: "Informacion de un chat",
        usage: "z!infochat token",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        if (!args[0])
            return embedResponse('Ejemplo de uso: <prefix>infochat token_chat')


        let checkM = await rModel('chat').findOne({ token: args[0] });

        if (!checkM)
            return embedResponse('Token inexistente!')


        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .addField('Type', type, true)
            .addField('Bans(num)', bans.length, true)
            .addField('Joinable(num)', joinable.length, true)
            .addField('Admins(num)', admins.length, true)
            .addField('Owner', `<@${owner}>`, true)
            .addField(`Users(num)`, users.length, true)
            .addField(`Max(num)`, max, true)
            .addField(`Token`, token, true)
            .addField(`Name`, name, true)
            .addField(`Description`, description, true)
        message.channel.send({ embed: embed })


    }
}