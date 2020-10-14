const Discord = require("discord.js");

module.exports = async (client, oldMessage, newMessage) => {

    if (!newMessage.author) return;
    if (!oldMessage.content) return;
    if (!newMessage.content) return;
    if (!newMessage.guild || !oldMessage.guild) return;
    let data = (await client.getData({ id: newMessage.guild.id }, 'logs'))
    if (newMessage.author.bot) return;
    if (newMessage.channel.type === 'dm') return;
    if (newMessage.content === oldMessage.content) return;
    client.emit('message', newMessage);
    if (!data) return;
    if (!newMessage.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
    let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('<:messageUpdate:723267945194586122> Message Updated')
        .addField('• Old message', oldMessage.content, true)
        .addField('• New message', newMessage.content, true)
        .addField('• Link', `[Link of the message](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`, false)
        .addField('• Author', newMessage.author.tag, true)
        .addField('• Author ID', newMessage.author.id, true)
        .addField('• Author mention', `<@${newMessage.author.id}>`, false)
        .addField('• Author channel name', newMessage.channel.name, true)
        .addField('• Author channel ID', newMessage.channel.id, true)
        .addField('• Author channel mention', `<#${newMessage.channel.id}>`, false)
        .setFooter(newMessage.guild.name, newMessage.guild.iconURL({ format: 'png', size: 2048 }))
        .setTimestamp()
    return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed })

};