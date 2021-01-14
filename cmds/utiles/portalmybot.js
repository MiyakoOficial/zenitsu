const Discord = require('discord.js')
const mybo = require("myscrapper");

module.exports = {
    config: {
        name: "portalmybot", //nombre del cmd
        alias: [`mybo`, `mybot`, `myscrapper`], //Alias
        description: "Ver informacion de los usuarios de portalmybot.com", //Descripción (OPCIONAL)
        usage: "z!portalmybot USUARIO",
        category: 'utiles',
        botPermissions: [],
        memberPermissions: []
    },
    run: async ({ message, args, embedResponse, client }) => {

        if (!args[0]) return embedResponse('<a:CatLoad:724324015275245568> | ¿A quien quieres buscar?');

        let { data } = await mybo.mybot(args[0]);

        if (data.message)
            return embedResponse('<:cancel:779536630041280522> | ' + data.message)

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setAuthor(data.nombre, data.avatar, `https://portalmybot.com/u/${args[0]}`)
            .addField('Nivel', data.nivel, true)
            .addField('Biografia', data.biografia ? data.biografia.slice(0, 1000) : 'Sin biografia.', true)
            .addField("Numero de logros", data.logros.length, true)
            .addField('Numero de seguidores', data.seguidores, true)
            .addField('Puntos web', data.puntosWeb, true)
            .addField('Link del perfil', `https://portalmybot.com/u/${args[0]}`, true)
            .addField('Logros', data.logros && data.logros.length >= 1 ? data.logros.join(', ').slice(0, 1000) : 'Sin logros.', true)
            .setFooter(`Ubicacion: ${data.ubicacion ? data.ubicacion.slice(0, 1000) : 'Sin especificar.'}`)

        message.channel.send({ embed: embed }).catch(() => { });
    }
};