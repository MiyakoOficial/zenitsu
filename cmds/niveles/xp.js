const Discord = require('discord.js');
module.exports = {
    config: {
        name: "xp", //nombre del cmd
        alias: ['exp'], //Alias
        description: "Saber el nivel y experiencia", //Descripción (OPCIONAL)
        usage: "z!xp",
        category: 'niveles'

    }, run: async ({ client, message, args }) => {
        const { color } = client;

        let getRank = (member) => {

            return new Promise((resolve) => {
                client.rModel('niveles').find({ idGuild: message.guild.id }).sort({ nivel: -1 }).exec((err, res) => {

                    let results = res.map(a => a.idMember);

                    resolve(results.findIndex(a => a === member.user.id) + 1);

                });
            });
        };

        let getGlobalRank = (member) => {

            return new Promise((resolve) => {
                client.rModel('niveles').find({}).sort({ nivel: -1 }).exec((err, res) => {

                    let results = res.map(a => a.idMember);

                    resolve(results.findIndex(a => a === member.user.id) + 1);

                });
            });
        };

        let member = message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member
        let { nivel, xp } = await client.getData({ idGuild: `${message.guild.id}`, idMember: `${member.user.id}` }, 'niveles');
        let levelup = 5 * (nivel ** 2) + 50 * nivel + 100;
        //console.log(xp, nivel);
        message.channel.startTyping();
        message.channel.stopTyping();
        let embed = new Discord.MessageEmbed()
            .setDescription(`<a:cargando:650442822083674112>`)
            .setColor(color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        return message.channel.send({ embed: embed }).then(async a => {
            let rank = await getRank(member)
            let global = await getGlobalRank(member);
            return a.edit(a.embeds[0].setDescription(`Nivel: ${nivel ? nivel : 0} \nXp: ${xp ? xp : 0}/${levelup ? levelup : '100'}\nRank: ${rank === null ? 'Sin resultados' : rank}\nRank global: ${global}`))
        })

    }
}