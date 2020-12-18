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
        if (message.author.id !== '507367752391196682')
            return;

        let seleccion = (num) => {
            if (!num || !parseInt(num) || 0 >= parseInt(num))
                return 1

            else
                return parseInt(num);

        }


        let queue = message.guild.player();

        if (!queue || !queue.queue[0])
            return embedResponse(`<:cancel:779536630041280522> | No hay canciones en cola.`)

        queue = queue.queue

        let num = 5;

        queue = funcionPagina(queue, num);
        if (!queue[seleccion(args[0]) - 1])
            return embedResponse(`<:cancel:779536630041280522> | No hay canciones en la pagina ${seleccion(args[0])}.`)
        queue = queue.map((a, i) => {

            return `[${emoji(a)}][${(i + 1) + num * (seleccion(args[0]) <= 0 ? 1 : seleccion(args[0]) - 1)}] [${a.name}](${a.url}) - ${client.newDate(a.duration)} - ${a.message.author.toString()}`

        });

        let np = queue.current;
        let embed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor(`Reproduciendo ahora`)
            .setDescription(`[${np.title}](${np.uri}) - ${client.newDate(np.duration)}\n\n*\`En cola:\`*\n\n${queue.join('\n') || 'No hay ninguna cancion.'}`)
            .setTimestamp()
            .setFooter(`Pagina ${seleccion(args[0])} de SI.`)
            .setThumbnail('https://media1.tenor.com/images/869a5e483261d0b8e4f296b1152cba8e/tenor.gif?itemid=15940704');

        return message.channel.send({ embed: embed })

    }
}

function funcionPagina(elArray, num = 10) {
    let pagina = [];
    for (let i = 0; i < elArray.length; i += num) {
        pagina.push(elArray.slice(i, i + num))
    }
    return pagina;
}

function emoji(obj) {
    return obj.isStream
        ? '<a:frog_rotate:720984862231887883>'
        : obj.fromPlaylist
            ? '<:mc_song:786660726914678834>'
            : '<a:songDJ:786662120388296724>'
}