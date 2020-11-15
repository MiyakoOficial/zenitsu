const Discord = require('discord.js')
const mybo = require("myscrapper");

module.exports = {
    config: {
        name: "portalmybot", //nombre del cmd
        alias: [`mybo`, `mybot`, `myscrapper`], //Alias
        description: "Ver informacion de los usuarios de portalmybot.com", //Descripción (OPCIONAL)
        usage: "z!portalmybot",
        category: 'utiles'
    },
    run: async ({ message, args, embedResponse, client }) => {

        if (!args[0]) return embedResponse('¿Que quieres buscar?');

        if (args[0].match(/[^A-Z0-9]/gi))
            return embedResponse('Usuario invalido.')

        let data = await mybo.getUser(args[0]);

        if (data.message)
            return embedResponse(data.message)

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setAuthor(data.nombre, data.avatar)
            .addField('Nivel', data.nivel, true)
            .addField('Biografia', data.biografia ? data.biografia : 'Sin biografia.', true)
            .addField("Numero de logros", data.logros.length, true)
            .addField('Numero de seguidores', data.seguidores, true)
            .addField('Puntos web', data.puntosWeb, true)
            .addField('Ultimo codigo', data.codigos.length >= 1 ? `[${data.codigos[0].titulo}](${data.codigos[0].link})` : 'No tiene codigos subidos.', true)
            .addField('Logros', data.logros.length >= 1 ? data.logros.join(', ') : 'Sin logros.', true)
            .setFooter('Ubicacion: ' + data.ubicacion ? data.ubicacion : 'Sin especificar.')

        message.channel.send({ embed: embed }).catch(() => { });
    }
};