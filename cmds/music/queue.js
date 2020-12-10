const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "queue", //Nombre del cmd
        alias: ['q'], //Alias
        description: "Ver la cola de reproduccion", //Descripción (OPCIONAL)
        usage: "z!queue",
        category: 'musica'
    },
    run: ({ message, client, args, embedResponse }) => {

        let seleccion = (num) => {
            if (!num || !parseInt(num) || 0 >= parseInt(num))
                return 1

            else
                return parseInt(num);

        }


        let queue = message.guild.getQueue();

        if (!queue || !queue.songs || !queue.songs[seleccion(args[0]) - 1])
            return embedResponse('No hay canciones reproduciendose.')

        queue = funcionPagina(queue.songs);
        queue = queue[seleccion(args[0]) - 1].map((a, i) => {

            return `[${(i + 1) + 10 * (seleccion(args[0]) <= 0 ? 1 : seleccion(args[0]) - 1)}] [${a.name}](${a.url}) - ${a.formattedDuration} - ${a.user.toString()}`

        });

        let embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(queue.join('\n'))
            .setTimestamp()

        message.channel.send({ embed: embed })

    }
}

function funcionPagina(elArray, num = 10) {
    let pagina = [];
    for (let i = 0; i < elArray.length; i += num) {
        pagina.push(elArray.slice(i, i + num))
    }
    return pagina;
}