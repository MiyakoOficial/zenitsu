const Discord = require('discord.js');
module.exports = {
    config: {
        name: "xp", //nombre del cmd
        alias: ['exp'], //Alias
        description: "Saber el nivel y experiencia", //Descripción (OPCIONAL)
        usage: "z!xp",
        category: 'niveles',
        botPermissions: [],
        memberPermissions: []

    }, run: async ({ client, message, args }) => {
        const { color } = client;
        let obj = [];
        let getRank = (member) => {
            let obj = [];
            return new Promise((resolve) => {
                client.rModel('niveles').find({ idGuild: message.guild.id }).sort({ nivel: -1 }).exec((err, res) => {
                    res.map(a => {
                        if (!obj[a.nivel]) {
                            obj[a.nivel] = [];
                        }
                        obj[a.nivel].push(a);
                        return a.idMember
                    });
                    obj = obj.map(a => a.sort((a, b) => a.xp - b.xp)).filter(a => a)
                    let XD = obj
                    let aver = [];
                    for (let i of XD) { for (let a of i) aver.push(a) }
                    resolve(aver.reverse().findIndex(a => a.idMember == member.id) + 1)
                });
            });
        };

        let getGlobalRank = (member) => {
            return new Promise((resolve) => {
                client.rModel('niveles').find({}).sort({ nivel: -1 }).exec((err, res) => {
                    res.map(a => {
                        if (!obj[a.nivel]) {
                            obj[a.nivel] = [];
                        }
                        obj[a.nivel].push(a);
                        return a.idMember
                    });
                    obj = obj.map(a => a.sort((a, b) => a.xp - b.xp)).filter(a => a)
                    let XD = obj
                    let aver = [];
                    for (let i of XD) { for (let a of i) aver.push(a) }
                    resolve(aver.reverse().findIndex(a => a.idMember == member.id) + 1)
                });
            });
        };
        let member = message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member
        let { nivel, xp } = await client.getData({ idGuild: `${message.guild.id}`, idMember: `${member.user.id}` }, 'niveles');
        let levelup = 5 * (nivel ** 2) + 50 * nivel + 100;
        let embed = new Discord.MessageEmbed()
            .setDescription(`<a:cargando:650442822083674112>`)
            .setColor(color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        return message.channel.send({ embed: embed }).then(async a => {
            let rank = await getRank(member)
            let global = await getGlobalRank(member);
            return a.edit(a.embeds[0].setDescription(`<:upvote:721259868937388033> Nivel: ${nivel ? nivel : 0} \n🔷 XP: ${xp ? xp : 0}/${levelup ? levelup : '100'}\n<:member:779536579966271488> Rank: ${rank}\n🌐 Rank global: ${global}`))
        });
    }
};