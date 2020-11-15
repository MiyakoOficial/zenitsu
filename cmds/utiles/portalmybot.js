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

        let data = await mybo.getUser(args[0]);

        if (data.message)
            return embedResponse(data.message)

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setAuthor(data.nombre, data.avatar)
            .addField('Nivel', data.nivel, true)
            .addField('Biografia', data.biografia)
            .addField("Numero de logros", data.logrosCount, true)
            .addField('Numero de seguidores', data.seguidores, true)
            .addField('Puntos web', data.puntosWeb, true)
            .addField('Logros', data.logros.join(', '), true)

        message.channel.send({ embed: embed }).catch(() => { });
    }
};