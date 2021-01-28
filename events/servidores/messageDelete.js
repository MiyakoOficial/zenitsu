const Discord = require("discord.js");

module.exports = async (client, message) => {

    if (!message) return;
    if (!message.author) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content) return;
    await client.updateData({ id: message.channel.id }, { nombre: message.author.tag, avatarURL: message.author.displayAvatarURL({ dynamic: true }), mensaje: message.content }, 'snipe')

    let data = message.guild.cacheLogs || (await require('../../models/logs').findOne({ id: message.guild.id }))
    if (!data) return;
    if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return require('../../models/logs').deleteOne({ id: message.guild.id });
    message.guild.cacheLogs = data;
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle('<:zsMessageDelete:709728834915794974> Message Deleted')
        .addField('• Message', message.content)
        .addField('• Author', message.author.tag, true)
        .addField('• Author ID', message.author.id, true)
        .addField('• Author mention', `<@${message.author.id}>`, false)
        .addField('• Author channel name', message.channel.name, true)
        .addField('• Author channel ID', message.channel.id, true)
        .addField('• Author channel mention', `<#${message.channel.id}>`, false)
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setTimestamp()
    return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(() => { })

};