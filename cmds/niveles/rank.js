/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
const Discord = require('discord.js');
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "rank"
        this.alias = ['rk']
        this.category = 'niveles'
    }
    async run({ client, message, args, embedResponse }) {
        let seleccion = parseInt(args[1]) || 1;

        const { color } = client;

        switch (args[0]) {

            case 'local':
                let res = await getRank();
                if (res.length === 0) return embedResponse("🤔 | Parece que nadie ha hablado en este servidor.")
                let pagina = res.slice(10 * (seleccion - 1), 10 * seleccion);
                let embed = new Discord.MessageEmbed()
                    .setDescription(client.remplazar(
                        pagina.map((v, i) => {

                            let I = (i + 1) + 10 * (seleccion <= 0 ? 1 : seleccion - 1);

                            return `${I} | ${I == 1 && i == 0 || I == 2 && i == 1 || I == 3 && i == 2 ? '[👑] ' : ''}${!client.users.cache.get(v.idMember) ? v.cacheName == 'none' ? 'Miembro desconocido.' : v.cacheName : client.users.cache.get(v.idMember).tag} - ${!v.nivel ? 0 : v.nivel}`

                        }).join('\n') || `<:cancel:804368628861763664> | En la pagina ${seleccion} no hay datos.`
                    )
                    )
                    .setTimestamp()
                    .setFooter(`Pagina actual: ${seleccion <= 0 ? 1 : seleccion} de ${Math.round(res.length / 10)}`)
                    .setColor(color)

                message.channel.send({ embed: embed }).catch(() => { })
                break;
            case 'global':
                let ress = await getGlobalRank();
                if (ress.length === 0) return embedResponse("🤔 | Parece que nadie ha hablado.")
                let paginaa = ress.slice(10 * (seleccion - 1), 10 * seleccion);
                let embedd = new Discord.MessageEmbed()
                    .setDescription(client.remplazar(
                        paginaa.map((v, i) => {

                            let I = (i + 1) + 10 * (seleccion <= 0 ? 1 : seleccion - 1);

                            return `${I} | ${I == 1 && i == 0 || I == 2 && i == 1 || I == 3 && i == 2 ? '[👑] ' : ''}${!client.users.cache.get(v.idMember) ? v.cacheName == 'none' ? 'Miembro desconocido.' : v.cacheName : client.users.cache.get(v.idMember).tag} - ${!v.nivel ? 0 : v.nivel}`

                        }).join('\n') || `<:cancel:804368628861763664> | En la pagina ${seleccion} no hay datos.`
                    )
                    )
                    .setTimestamp()
                    .setFooter(`Pagina actual: ${seleccion <= 0 ? 1 : seleccion} de ${Math.round(ress.length / 10)}`)
                    .setColor(color)

                message.channel.send({ embed: embedd }).catch(() => { })
                break;
            default:
                let embedError = new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setTimestamp()
                    .setDescription('<:cancel:804368628861763664> | Tienes que elegir entre global y local!\n~~Ejemplo: z!rk global 1~~')
                message.channel.send({ embed: embedError })
                break;

        }
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
                    resolve(aver.reverse())
                });
            });
        }

        function getGlobalRank() {
            let obj = [];
            let check = [];
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
                    resolve(aver.reverse())
                });
            });
        }
    }
}