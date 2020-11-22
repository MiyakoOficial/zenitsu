const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "resetwarns", //nombre del cmd
        alias: [], //Alias
        description: "Reiniciar advertencias", //Descripción (OPCIONAL)
        usage: "z!resetwarns @mencion",
        category: 'moderacion',
        botPermissions: [],
        memberPermissions: ['ADMINISTRATOR']

    }, run: async ({ message, embedResponse, client }) => {

        let member = message.mentions.members.first();

        if (!member || member?.user?.bot) return embedResponse('<:cancel:779536630041280522> | Menciona a un miembro del servidor.')

        await require('../../models/warns.js').deleteOne({ idGuild: message.guild.id, idMember: member.id });

        let embed = new MessageEmbed()
            .setDescription(`📢 | Ahora ${member.toString()} tiene 0 advertencias.`)
            .setFooter(`Advertencias reseteadas por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setTimestamp()
            .setColor(client.color)
        return message.channel.send({ embed: embed })

    }
}