const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "help", //nombre del cmd
        alias: ['h'], //Alias
        description: "Ver información de los comandos", //Descripción (OPCIONAL)
        usage: "z!help <comando>",
        category: 'bot'
    },
    run: ({ client, message, args, embedResponse }) => {

        let embedHelp = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .addField('Utiles', client.commands.filter(a => a.config.category === 'utiles').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Nivel', client.commands.filter(a => a.config.category === 'niveles').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Diversion', client.commands.filter(a => a.config.category === 'diversion').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Moderación', client.commands.filter(a => a.config.category === 'moderacion').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Bot', client.commands.filter(a => a.config.category === 'bot').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Among Us', client.commands.filter(a => a.config.category === 'among us').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Administracion', client.commands.filter(a => a.config.category === 'administracion').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Nuevo: Batallas contra demonios', client.commands.filter(a => a.config.category === 'rol').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Interacción', client.commands.filter(a => a.config.category === 'interacción').map(a => `\`${a.config.name}\``).join(', '))
            .addField('(Solo disponible en el soporte)', client.commands.filter(a => a.config.category === 'servidor').map(a => `\`${a.config.name}\``).join(', '))
            .setImage('https://cdn.discordapp.com/attachments/765608178540609598/766651849050292234/para_el_pibe_2.jpg')

        if (!args[0])
            return message.channel.send({ embed: embedHelp });

        if (!client.commands.map(a => a.config.name).includes(args[0]))
            return embedResponse('`Comando` no encontrado.')

        let datos = client.commands.find(a => a.config.name === args[0])
        let alia = datos.config.alias;
        let embed = new Discord.MessageEmbed()
            .addField(`Name`, datos.config.name, true)
            .addField('Usage', datos.config.usage, true)
            .addField('Aliases', alia.length == 0 ? 'No tiene' : alia.join(', '), true)
            .addField('Description', datos.config.description, true)
            .setColor(client.color)
            .setTimestamp()
        return message.channel.send({ embed: embed })

    }
}