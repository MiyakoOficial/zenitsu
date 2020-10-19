const Discord = require('discord.js');
module.exports = {
    config: {
        name: "top",//Nombre del cmd
        alias: ['to'], //Alias
        description: "Visualizar el leaderboard", //Descripción (OPCIONAL)
        usage: "z!top",
        category: 'rol'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {
        let seleccion = parseInt(args[0]) || 1;

        const { color } = client;

        switch (args[0]) {
            case 'level': await client.rModel('demonios').find().limit(150).sort({ nivelespada: -1 }).exec(async (err, res) => {
                if (err) return console.log(err);
                if (res.length === 0) return embedResponse("No hay datos...")

                let pagina = res.slice(10 * (seleccion - 1), 10 * seleccion);

                let embed = new Discord.MessageEmbed()
                    .setDescription(
                        pagina.map((v, i) =>

                            `${(i + 1) + 10 * (seleccion <= 0 ? 1 : seleccion - 1)} | ${!client.users.cache.get(v.id) ? 'Miembro desconocido!' : client.users.cache.get(v.id).tag} - ${!v.nivelespada ? 0 : v.nivelespada}`

                        ).join('\n') || 'Pagina inexistente!'
                    )
                    .setTimestamp()
                    .setFooter(`Pagina actual: ${seleccion <= 0 ? 1 : seleccion}`)
                    .setColor(color)

                message.channel.send({ embed: embed }).catch(e => { })

            });
                break;

            case 'kill': await client.rModel('demonios').find().limit(150).sort({ monstruos: -1 }).exec(async (err, res) => {
                if (err) return console.log(err);
                if (res.length === 0) return embedResponse("No hay datos...")

                let pagina = res.slice(10 * (seleccion - 1), 10 * seleccion);

                let embed = new Discord.MessageEmbed()
                    .setDescription(
                        pagina.map((v, i) =>

                            `${(i + 1) + 10 * (seleccion <= 0 ? 1 : seleccion - 1)} | ${!client.users.cache.get(v.id) ? 'Miembro desconocido!' : client.users.cache.get(v.id).tag} - ${!v.monstruos ? 0 : v.monstruos}`

                        ).join('\n') || 'Pagina inexistente!'
                    )
                    .setTimestamp()
                    .setFooter(`Pagina actual: ${seleccion <= 0 ? 1 : seleccion}`)
                    .setColor(color)

                message.channel.send({ embed: embed }).catch(e => { })

            });
                break;

            default:

                return embedResponse(`Elije entre las opciones: level, kill`)

                break;

        }
    }
}