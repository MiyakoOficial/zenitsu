//Después de Alias es opcional.
const Discord = require('discord.js');

module.exports = {
    config: {
        name: "channel", //nombre del cmd
        alias: ['canal'], //Alias
        description: "Comprobar los canales de logs/xp", //Descripción (OPCIONAL)
        usage: "z!channel",
        category: 'utiles'
    },
    run: async ({ client, message }) => {

        let { canal } = await client.getData({ id: message.guild.id }, 'logslevel');
        let { channellogs } = await client.getData({ id: message.guild.id }, 'logs');
        let canal1
        let canal2;
        if (!canal || canal.length < 5) {
            canal1 = 'No establecido.';
        }
        else {
            canal1 = canal ? `<#${canal}>(${canal})` : 'No establecido!';
        }
        if (!channellogs || channellogs.length < 5) {
            canal2 = 'No establecido.';
        }
        else {
            canal2 = channellogs ? `<#${channellogs}>(${channellogs})` : 'No establecido!';
        }

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .addField('Canal XP', canal1)
            .addField('Canal de logs', canal2)

        return message.channel.send({ embed: embed });
    }
}