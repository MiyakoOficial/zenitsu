const Discord = require('discord.js');
module.exports = {
    config: {
        name: "dance",//Nombre del cmd
        alias: [], //Alias
        description: "Manda un gif bailando", //Descripción (OPCIONAL)
        usage: "z!dance",
        category: 'roleplay'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {
        let urls = ['https://cdn.weebs.cl/images/7GWP2R6f.gif', 'https://cdn.weebs.cl/images/g3sZJhPk.gif', 'https://cdn.weebs.cl/images/vthhq2Kw.gif', 'https://cdn.weebs.cl/images/RZIM12Cr.gif', 'https://cdn.weebs.cl/images/YfzWIot0.gif', 'https://cdn.weebs.cl/images/E7DEoPSr.gif', 'https://cdn.weebs.cl/images/s_SJMYLG.gif', 'https://cdn.weebs.cl/images/21XgUw8r.gif', 'https://cdn.weebs.cl/images/CgEnYD_F.gif', 'https://cdn.weebs.cl/images/sD_erJgF.gif', 'https://cdn.weebs.cl/images/2EUgMd1u.gif', 'https://cdn.weebs.cl/images/vWClT8qB.gif', 'https://cdn.weebs.cl/images/h-wsjinm.gif', 'https://cdn.weebs.cl/images/gtu4ZkqK.gif', 'https://cdn.weebs.cl/images/w0qx0xf1.gif', 'https://cdn.weebs.cl/images/6hQj4jYN.gif', 'https://cdn.weebs.cl/images/zYgHSMDa.gif', 'https://cdn.weebs.cl/images/bDzErtKh.gif', 'https://cdn.weebs.cl/images/eq2802uu.gif', 'https://cdn.weebs.cl/images/N4-THuxy.gif'];
        let link = urls[Math.floor(Math.random() * urls.length)];

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} se ha puesto a bailar!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(er => { });

    }
}