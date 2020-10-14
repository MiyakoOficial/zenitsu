const Discord = require('discord.js');

module.exports = async (client, guild) => {

    let add1 = `
- Nombre: ${guild.name}
- Dueño: ${guild.owner.user.tag}
Server ID: ${guild.id}
Miembros: ${guild.members.cache.size}(Humanos: ${guild.members.cache.filter(a => !a.user.bot).size})
`

    let embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setThumbnail(guild.iconURL)
        .setTimestamp()
        .addField('Información del servidor.', add1)

    guild.channels.cache.random().send({ embed: embed })
};