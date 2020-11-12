//Después de Alias es opcional.
const Discord = require('discord.js');

module.exports = {
    config: {
        name: "perfilmybot", //Nombre del cmd
        alias: ["mybo", "mybot"], //Alias
        description: "Ver tu perfil o de otra persona en la pagina portalmybo", //Descripción (OPCIONAL)
        usage: "z!perfilmybot",
        category: 'utiles'
    },
    run: async ({ client, message, args, embedResponse }) => {

        if (!args[0])
            return embedResponse('¿A quien quieres buscar?')

        const fetch = require('node-fetch');
        let data = await fetch(`https://mybo.me/${args[0]}`);
        data = await data.text();

        if (data.includes('Upps! Ocurrio un error</h2> La pagina que intentabas buscar, no esta disponible o no tienes acceso a ella. <br><br>'))
            return embedResponse('Usuario invalido.')

        //console.log(data)

        let seguidores = data.split('<div>')[0].split('data countFollow">')[1].split('<br>')[0]
        //        console.log(puntos);

        let puntosWeb = data.split('<div>')[0].split('data countPoint">')[1].split('<br>')[0]
        //        console.log(puntosWeb)



        let logrosCount = data.split('<div>')[0].split('data">')[1].split('<br>')[0]
        //        console.log(logrosCount)

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .addField("Puntos web", puntosWeb, true)
            .addField('Numero de seguidores.', seguidores, true)
            .addField('Numero de logros', logrosCount, true)
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(() => { })

    }
}