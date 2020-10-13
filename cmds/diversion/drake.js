const Discord = require('discord.js');
module.exports = {
    config: {
        name: "drake",//Nombre del cmd
        alias: [], //Alias
        description: "Manda una imagen con el meme de drake", //Descripción (OPCIONAL)
        usage: "z!drake texto ,|, texto2",
        category: 'diversion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let argumento = args.join(' ').split(' ,|, ')
        let txt = encodeURIComponent(argumento[0]);
        let texto = encodeURIComponent(argumento[1])
        let link = `https://api.alexflipnote.dev/drake?top=${txt}&bottom=${texto}`;
        if (!argumento[1]) return embedResponse('Ejemplo de uso:\n```js\nz!drake Hola ,|, Adios```')
        if (argumento[0].length >= 60) return embedResponse('El primer argumento debe tener menos de `60`')
        if (argumento[1].length >= 60) return embedResponse('El segundo argumento debe tener menos de `60`')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setTimestamp()
            .setColor(client.color);

        return message.channel.send({ embed: embed })
    }
}