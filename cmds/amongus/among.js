/* eslint-disable no-case-declarations */
const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "among", //nombre del cmd
        alias: [], //Alias
        description: "Silenciar a todos en el canal de voz", //Descripción (OPCIONAL)
        usage: "z!among < list | room > < num | code >",
        category: 'among us',
        nousable: true
    }, run: async ({ client, message, args, embedResponse }) => {

        let salasR = new Array();

        switch (args[0]) {

            case 'queue':

                // eslint-disable-next-line no-case-declarations
                let printthis = message.guild.members.cache.map(a => a.presence)
                    .filter(a => a && a.activities && a.activities.find(a => a && a.applicationID == '477175586805252107'))
                    .map(a => a.activities.find(a => a.applicationID == '477175586805252107'))
                    .filter(a => a.party && a.party.id)

                printthis = printthis.map(a => {
                    if (salasR.includes(a.party.id))
                        return;
                    salasR.push(a.party.id)
                    return `\`\`\`md\n# Among Us\n* : ${a.party.id}\n> ${a.party.size[0]}/${a.party.size[1]}\n< ${a.state}\`\`\``
                })

                // eslint-disable-next-line no-case-declarations
                let seleccion = Number(args[1]) - 1 || 0;

                // eslint-disable-next-line no-case-declarations
                let res = await funcionPagina(printthis)

                if (!res[seleccion])
                    return embedResponse(`Pagina inexistente.\nPagina: ${seleccion + 1}/${res.length}`)

                embedResponse(`${res[seleccion].join('\n')}\nPagina: ${seleccion + 1}/${res.length}`)

                break;

            case 'room':
                // eslint-disable-next-line no-case-declarations
                let allPlaying = message.guild.presences.cache.filter((p) => {
                    let a = p.activities.find((a) => a.applicationID === "477175586805252107");
                    if (a && a.party && a.party.id) return true;
                });
                let embed = new Discord.MessageEmbed().setColor(client.color)

                if (!args[1]) return embedResponse("Especifica el código.");

                // eslint-disable-next-line no-case-declarations
                let party = allPlaying.filter((p) => {
                    let a = p.activities.find((a) => a.applicationID === "477175586805252107");
                    if (a.party.id === args[1].toUpperCase()) return true;
                });

                if (!party.first()) return embedResponse("Código invalido.");

                let allPlayers = party.map(p => {
                    let a = p.activities.find((a) => a.applicationID === "477175586805252107");
                    let host = a.details === "Hosting a game" ? "(Host)" : ""
                    return `<@${p.userID}> ${host}`;
                });

                let partyInfo = party.first().activities.find((a) => a.applicationID === "477175586805252107").party

                embed.setDescription(allPlayers)
                    .setFooter(`${partyInfo.size[0]}/${partyInfo.size[1]} jugadores. (Solo muestra usuarios de Discord)`);

                message.channel.send({ embed: embed }).catch(() => { }); // Enviamos el embed

                break;

            default:
                embedResponse('Uso incorrecto, ejemplo de uso: z!among < queue | room > num/code')

        }
    }
}

function funcionPagina(elArray, num = 10) {
    let pagina = [];
    for (let i = 0; i < elArray.length; i += num) {
        pagina.push(elArray.slice(i, i + num))
    }
    return pagina;
}
