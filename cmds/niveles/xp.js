const Discord = require('discord.js');
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "xp"
        this.alias = ['exp']
        this.category = 'niveles'
    }
    run({ client, message, args }) {
        const { color } = client;

        function getRank() {
            let check = [];
            let obj = [];
            return new Promise((resolve) => {
                client.rModel('niveles').find({ idGuild: message.guild.id }).sort({ nivel: -1 }).exec((err, res) => {
                    res.map(a => {
                        if (!obj[a.nivel]) {
                            obj[a.nivel] = [];
                        }
                        if (check.includes(a.idMember)) return false;
                        check.push(a.idMember)
                        obj[a.nivel].push(a);
                        return a.idMember
                    });
                    obj = obj.map(a => a.sort((a, b) => a.xp - b.xp)).filter(a => a)
                    let XD = obj
                    let aver = [];
                    for (let i of XD) { for (let a of i) aver.push(a) }
                    resolve({ rank: aver.reverse().findIndex(a => a.idMember == member.id) + 1, data: aver.reverse().find(a => a.idMember == member.id) })
                });
            });
        }

        let getGlobalRank = (member) => {
            let check = [];
            let obj = [];
            return new Promise((resolve) => {
                client.rModel('niveles').find({}).sort({ nivel: -1 }).exec((err, res) => {
                    res.map(a => {
                        if (!obj[a.nivel]) {
                            obj[a.nivel] = [];
                        }
                        if (check.includes(a.idMember)) return false;
                        check.push(a.idMember)
                        obj[a.nivel].push(a);
                        return a.idMember
                    });
                    obj = obj.map(a => a.sort((a, b) => a.xp - b.xp)).filter(a => a)
                    let XD = obj
                    let aver = [];
                    for (let i of XD) { for (let a of i) aver.push(a) }
                    resolve({ rank: aver.reverse().findIndex(a => a.idMember == member.id) + 1, data: aver.reverse().find(a => a.idMember == member.id) })
                });
            });
        };
        let member = message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member
        let levelup = (nivel) => 5 * (nivel ** 2) + 50 * nivel + 100;
        let embed = new Discord.MessageEmbed()
            .setDescription(`<a:cargando:650442822083674112>`)
            .setColor(color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        return message.channel.send({ embed: embed }).then(async a => {
            let dato = await Promise.all([getRank(member), getGlobalRank(member)]);
			let rank = dato[0]
            let global = dato[1]
            return a.edit(a.embeds[0].setDescription(`<:upvote:721259868937388033> Nivel: ${rank.data.nivel ? rank.data.nivel : 0} \n🔷 XP: ${rank.data.xp ? rank.data.xp : 0}/${levelup(rank.data.nivel) ? levelup(rank.data.nivel) : '100'}\n<:member:779536579966271488> Rank: ${rank.rank ? rank.rank : '❌'}\n🌐 Rank global: ${global.rank ? global.rank : '❌'}`))
        });
    }
};