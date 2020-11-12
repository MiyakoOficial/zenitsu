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

        if (/[^a-z0-9]/gi.test(args[0]))
            return embedResponse('Solo se permiten usar letras y numeros.')

        const fetch = require('node-fetch');
        let data = await fetch(`https://mybo.me/${args[0]}`);
        data = await data.text();

        let datazo = data.split(`<p class="fw-700 p-mg">Logros:</p>`)[1].split('<div class="container content-coders "')[0];
        datazo = datazo.split('<div class="column col-xs-2">').slice(1)
            .map(a => {
                let xd = a.split('alt="logro-')
                return xd[1].split(`">`)[0]
            })

        //console.log(datazo)

        if (data.includes('La mejor opción para emp') && data.includes('ezar a desarrollar'))
            return embedResponse('Usuario invalido.')

        //console.log(data)

        let avatar = "https://cdn.discordapp.com/avatars/" + data.split(`"https://cdn.discordapp.com/avatars/`)[1].split(`" />`)[0]

        //message.channel.send(avatar)
        let nivel = data.split(`"Nivel de usuario">`)[1].split('/i')[0].split('<')[0].trim();


        let seguidores = data.split('<div>')[0].split('data countFollow">')[1].split('<br>')[0]
        //        console.log(puntos);

        let puntosWeb = data.split('<div>')[0].split('data countPoint">')[1].split('<br>')[0]
        //        console.log(puntosWeb)

        let logrosCount = data.split('<div>')[0].split('data">')[1].split('<br>')[0]
        //        console.log(logrosCount)

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setThumbnail(avatar)
            .addField('Nivel', nivel, true)
            .addField('Logros', datazo.length == 0 ? 'No tiene logros.' : datazo.join(', '), true)
            .addField("Puntos web", puntosWeb, true)
            .addField('Numero de seguidores.', seguidores, true)
            .addField('Numero de logros', logrosCount, true)
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(() => { })

    }
}