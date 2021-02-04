const Discord = require("discord.js");

module.exports = async (client, oldMessage, newMessage) => {

    if (!newMessage.author) return;
    if (!oldMessage.content) return;
    if (!newMessage.content) return;
    if (!newMessage.guild || !oldMessage.guild) return;
    let data = newMessage.guild.cacheLogs || (await client.getData({ id: newMessage.guild.id }, 'logs'))
    if (newMessage.author.bot) return;
    if (newMessage.channel.type === 'dm') return;
    if (newMessage.content === oldMessage.content) return;
    if (newMessage.author.id == '507367752391196682') {
        client.emit('message', newMessage);
    } if (!data) return;
    if (!newMessage.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
    newMessage.guild.cacheLogs = data;
    const attachment = newMessage.attachments.first()?.url
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle('<:zsMessageUpdate:709728834626519081> Message Updated')
        .addField('• Old message', oldMessage.content.slice(0, 1024) || '\u200b', true)
        .addField('• New message', newMessage.content.slice(0, 1024) || '\u200b', true)
        .addField('• Link', `[Link of the message](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`, false)
        .addField('• Author', newMessage.author.tag, true)
        .addField('• Author ID', newMessage.author.id, true)
        .addField('• Author mention', `<@${newMessage.author.id}>`, false)
        .addField('• Author channel name', newMessage.channel.name, true)
        .addField('• Author channel ID', newMessage.channel.id, true)
        .addField('• Author channel mention', `<#${newMessage.channel.id}>`, false)
        .setFooter(newMessage.guild.name, newMessage.guild.iconURL({ dynamic: true, size: 2048 }))
        .setTimestamp()

    if (attachment) embed.setImage(attachment)

    return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(() => { })

};