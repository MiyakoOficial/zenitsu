const Discord = require('discord.js');
module.exports = {
    config: {
        name: "rank", //nombre del cmd
        alias: ['rk'], //Alias
        description: "Visualizar el leaderboard", //Descripción (OPCIONAL)
        usage: "z!rank",
        category: 'niveles',
        botPermissions: [],
        memberPermissions: []

    }, run: async ({ client, message, args, embedResponse }) => {
        let seleccion = parseInt(args[0]) || 1;

        const { color } = client;

        await client.rModel('niveles').find({ idGuild: message.guild.id }).limit(150).sort({ nivel: -1 }).exec((err, res) => {
            if (err) return console.log(err);
            if (res.length === 0) return embedResponse("🤔 | Parece que nadie ha hablado en este servidor.")

            let pagina = res.slice(10 * (seleccion - 1), 10 * seleccion);

            let embed = new Discord.MessageEmbed()
                .setDescription(
                    pagina.map((v, i) => {

                        let I = (i + 1) + 10 * (seleccion <= 0 ? 1 : seleccion - 1);

                        return `${I} | [${I == 1 && i == 0 || I == 1 && i == 1 || I == 1 && i == 2 ? '👑' : '<:member:779536579966271488>'}]${!client.users.cache.get(v.idMember) ? v.cacheName == 'none' ? 'Miembro desconocido.' : v.cacheName : client.users.cache.get(v.idMember).tag} - ${!v.nivel ? 0 : v.nivel}`

                    }).join('\n') || `En la pagina ${seleccion} no hay datos.`
                )
                .setTimestamp()
                .setFooter(`Pagina actual: ${seleccion <= 0 ? 1 : seleccion}`)
                .setColor(color)

            message.channel.send({ embed: embed }).catch(() => { })

        });
    }
}