const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "among",//Nombre del cmd
        alias: [], //Alias
        description: "Silenciar a todos en el canal de voz", //Descripción (OPCIONAL)
        usage: "z!among < list | room > < num | code >",
        category: 'among us'
    }, run: async ({ client, message, args, embedResponse }) => {

        let salasR = new Array();

        switch (args[0]) {

            case 'queue':

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

                let seleccion = Number(args[1]) - 1 || 0;

                let res = await funcionPagina(printthis)

                if (!res[seleccion])
                    return embedResponse(`Pagina inexistente.\nPagina: ${seleccion + 1}/${res.length}`)

                embedResponse(`${res[seleccion].join('\n')}\nPagina: ${seleccion + 1}/${res.length}`)

                break;

            case 'room':

                break;

            default:
                embedResponse('Uso incorrecto, ejemplo de uso: z!among < queue | room > num/code')

        }
    }
}

async function funcionPagina(elArray, num = 10) {
    let pagina = [];
    for (let i = 0; i < elArray.length; i += num) {
        pagina.push(elArray.slice(i, i + num))
    }
    return pagina;
};
