const Discord = require('discord.js');
module.exports = {
    config: {
        name: "profile",//Nombre del cmd
        alias: [], //Alias
        description: "Manda el perfil de un miembro", //Descripción (OPCIONAL)
        usage: "z!profile",
        category: 'diversion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let member = message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member

        let data = (await client.getData({ id: member.user.id }, 'profile'));

        let { description, insignias, img, thumbnail, nick, footer, footertext } = data;

        let embed = new Discord.MessageEmbed()
            .setImage(img)
            .setThumbnail(thumbnail)
            .setAuthor(`Perfil de ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.color)
            .addField(`Descripción`, description)
            .addField('Insignias', insignias.length == 0 ? 'No tiene insignias.' : insignias.join(', '))
            .addField('Apodo', nick)
            .setFooter(footertext, footer)
            .setTimestamp()
        return message.channel.send({ embed: embed })
    }
}