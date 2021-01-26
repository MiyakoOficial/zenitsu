const Discord = require('discord.js');
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "top"
        this.category = 'extra'
    }
    async run({ client, message, args, embedResponse }) {
        let seleccion = parseInt(args[1]) || 1;

        const { color } = client;

        switch (args[0]) {
            case 'level': await client.rModel('demonios').find().limit(150).sort({ nivelespada: -1 }).exec((err, res) => {
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

                message.channel.send({ embed: embed }).catch(() => { })

            });
                break;

            case 'kill': await client.rModel('demonios').find().limit(150).sort({ monstruos: -1 }).exec((err, res) => {
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

                message.channel.send({ embed: embed }).catch(() => { })

            });
                break;

            default:

                return embedResponse(`Elije entre las opciones: level, kill`)

        }
    }
}