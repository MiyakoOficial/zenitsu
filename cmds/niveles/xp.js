const Discord = require('discord.js');
module.exports = {
    config: {
        name: "xp",//Nombre del cmd
        alias: ['exp'], //Alias
        description: "Saber el nivel y experiencia", //Descripción (OPCIONAL)
        usage: "z!xp",
        category: 'niveles'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {
        const { color } = client;

        let getRank = async (member) => {

            return new Promise((resolve, reject) => {
                client.rModel('niveles').find({ idGuild: message.guild.id }).sort({ nivel: -1 }).exec(async (err, res) => {

                    let results = res.map(a => a.idMember);

                    resolve(results.findIndex(a => a === member.user.id) + 1);

                });
            });
        };

        let member = message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member
        let { nivel, xp } = await client.getData({ idGuild: `${message.guild.id}`, idMember: `${member.user.id}` }, 'niveles');
        let levelup = 5 * (nivel ** 2) + 50 * nivel + 100;
        //console.log(xp, nivel);
        await message.channel.startTyping();
        let rank = await getRank(member)
        await message.channel.stopTyping();
        let embed = new Discord.MessageEmbed()
            .setDescription(`Nivel: ${nivel ? nivel : 0} \nXp: ${xp ? xp : 0}/${levelup ? levelup : '100'}\nRank: ${rank === null ? 'Sin resultados' : rank}`)
            .setColor(color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        message.channel.send({ embed: embed })

    }
}