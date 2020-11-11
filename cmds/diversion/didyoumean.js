const Discord = require('discord.js');
module.exports = {
    config: {
        name: "didyoumean", //nombre del cmd
        alias: [], //Alias
        description: "Sin descripción", //Descripción (OPCIONAL)
        usage: "z!didyoumean Hola ,|, Adios",
        category: 'diversion'

    }, run: ({ client, message, args, embedResponse }) => {

        let argumento = args.join(' ').split(' ,|, ')
        let txt = encodeURIComponent(argumento[0]);
        let texto = encodeURIComponent(argumento[1])
        let link = `https://api.alexflipnote.dev/didyoumean?top=${txt}&bottom=${texto}`;
        if (!argumento[1]) return embedResponse('Ejemplo de uso:\n```js\nz!didyoumean Hola ,|, Adios```')
        if (txt.length >= 45) return embedResponse('El primer argumento debe tener menos de `45`')
        if (texto.length >= 40) return embedResponse('El segundo argumento debe tener menos de `40`')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(client.color)
            .setTimestamp()
        return message.channel.send({ embed: embed })
    }
}