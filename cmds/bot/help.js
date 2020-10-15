const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "help",//Nombre del cmd
        alias: ['h'], //Alias
        description: "Ver información de los comandos", //Descripción (OPCIONAL)
        usage: "z!help <comando>",
        category: 'bot'
    },
    run: async ({ client, message, args, embedResponse }) => {

        let embedHelp = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .addField('Utiles', client.commands.filter(a => a.config.category === 'utiles').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Nivel', client.commands.filter(a => a.config.category === 'niveles').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Musica', client.commands.filter(a => a.config.category === 'musica').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Diversion', client.commands.filter(a => a.config.category === 'diversion').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Moderación', client.commands.filter(a => a.config.category === 'moderacion').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Chat', client.commands.filter(a => a.config.category === 'chat').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Bot', client.commands.filter(a => a.config.category === 'bot').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Among Us', client.commands.filter(a => a.config.category === 'among us').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Administracion', client.commands.filter(a => a.config.category === 'administracion').map(a => `\`${a.config.name}\``).join(', '))
            .addField('Roleplay', client.commands.filter(a => a.config.category === 'roleplay').map(a => `\`${a.config.name}\``).join(', '))

        if (!args[0])
            return message.channel.send({ embed: embedHelp });

        if (args[0] === 'chat') {
            let embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor(client.color)
                .setAuthor('Cosas basicas para aprender!')
                .setDescription(`createchat < public | private > num(maximo de usuarios en el chat)\n
    Si es privado tienes que invitar a los usuarios: invitechat user_id token_chat(el token se te dara al crearlo)\n
    Si es público solo diles el token y ellos tienen que hacer setchat token_chat.\n
    Si quieres ponerle un nombre usa: editchat name Nuevo nombre, lo mismo con la descripción(description) o el limite de usuarios(maxusers)`)
            return message.channel.send({ embed: embed })

        }

        if (!client.commands.map(a => a.config.name).includes(args[0]))
            return embedResponse('Comando equivocado!')

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