const Discord = require('discord.js');

module.exports = (client, guild) => {

    let add1 = `\`\`\`diff
+ Nombre: ${guild.name || '[¿.NO NAME SERVER.?]'}
+ Dueño: ${guild.owner?.user?.tag || '[¿.NO TAG OWNER.?]'}
+ Server ID: ${guild.id}
+ Miembros: ${guild.members.cache.size}(Humanos: ${guild.members.cache.filter(a => !a.user.bot).size})\`\`\`
`

    let add2 = `\`\`\`diff
+ Servidores: ${client.guilds.cache.size}
+ Usuarios: ${client.users.cache.size}
+ Canales: ${client.channels.cache.size}\`\`\``

    let embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${client.user.tag} ha sido invitado a un nuevo servidor!`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .addField('Información del servidor.', add1)
        .addField('Estadisticas.', add2)
    client.channels.cache.get('765994200746950726').send({ embed: embed })
};