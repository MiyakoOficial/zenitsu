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

        console.log('1')
        if (!data || data.toLowerCase().includes(`En marcha mi primer Bot, primeros pasos y más`))
            return embedResponse('Usuario invalido.')

        let logrosCheck = data.split(`<p class="fw-700 p-mg">Logros:</p>`)[1];
        console.log('2')
        if (!logrosCheck)
            return embedResponse('Usuario invalido.')

        let datazo = logrosCheck.split('<div class="container content-coders "')[0];
        console.log('3')
        if (!datazo)
            return embedResponse('Usuario invalido.')

        datazo = datazo.split('<div class="column col-xs-2">').slice(1)
            .map(a => {
                let xd = a.split('alt="logro-')
                return xd[1].split(`">`)[0]
            })

        let avatar = data.split(`"https://cdn.discordapp.com/avatars/`)[1] ? "https://cdn.discordapp.com/avatars/" + data.split(`"https://cdn.discordapp.com/avatars/`)[1].split(`" />`)[0] : 'https://cdn.discordapp.com/embed/avatars/2.png'

        let nivel = data.split(`"Nivel de usuario">`)[1].split('/i')[0].split('<')[0].trim();


        let seguidores = data.split('<div>')[0].split('data countFollow">')[1].split('<br>')[0]

        let puntosWeb = data.split('<div>')[0].split('data countPoint">')[1].split('<br>')[0]

        let logrosCount = data.split('<div>')[0].split('data">')[1].split('<br>')[0]

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setThumbnail(avatar)
            .addField('Nivel', nivel, true)
            .addField("Puntos web", puntosWeb, true)
            .addField('Numero de seguidores.', seguidores, true)
            .addField('Numero de logros', logrosCount, true)
            .addField('Logros', datazo.length == 0 ? 'No tiene logros.' : datazo.join(', '), true)
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(() => { })

    }
}