const Discord = require('discord.js');
module.exports = {
    config: {
        name: "findinvites", //nombre del cmd
        alias: [], //Alias
        description: "Ver los miembros con invitaciones en el estado", //Descripción (OPCIONAL)
        usage: "z!findinvites",
        category: 'moderacion',
        botPermissions: [],
        memberPermissions: []

    }, run: async ({ client, message, args, embedResponse }) => {

        const color = client.color;

        let x = message.guild.members.cache
            .filter(x => x.presence.activities[0])
            .filter(x => x.presence.activities[0].type === 'CUSTOM_STATUS')
            .filter(x => x.presence.activities[0].state)
            .filter(x => x.presence.activities[0].state.includes('discord.gg/'))
            .map(a => `${a.user.toString()} (${a.user.id})`);

        let paginas = funcionPagina(x, 10);

        /*for (let i = 0; i < x.length; i += 10) {
            paginas.push(x.slice(i, i + 10));
        }*/

        function seleccion() {
            let arg = args[0] || 1;
            if (arg < 0) return 1;
            else {
                return parseInt(arg) || 1;
            }
        }

        if (!paginas[seleccion() - 1])
            return embedResponse('No hay miembros con invitaciones en la pagina ' + seleccion())

        let inicio = new Discord.MessageEmbed()
            .setDescription(paginas[seleccion() - 1].join('\n'))
            .setColor(color)
            .setFooter(`Pagina ${seleccion()}/${paginas.length}`)
            .setTimestamp();

        await message.channel.send({ embed: inicio }).catch(() => { })

    }
}

function funcionPagina(elArray, num) {
    let pagina = [];
    for (let i = 0; i < elArray.length; i += num) {
        pagina.push(elArray.slice(i, i + num))
    }
    return pagina;
}