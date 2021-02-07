const Discord = require("discord.js");
const image = require('is-image');

module.exports = async (client, oldMessage, newMessage) => {

    if (!newMessage.guild || !oldMessage.guild) return;
    let data = newMessage.guild.cacheLogs || (await client.getData({ id: newMessage.guild.id }, 'logs'))
    if (oldMessage.partial || newMessage.partial) {
        oldMessage = await oldMessage.fetch().catch(() => { })
        newMessage = newMessage.partial ? await newMessage.fetch().catch(() => { }) : newMessage
    }

    if (!oldMessage || !newMessage) return;

    if (!oldMessage.author || !newMessage.author || newMessage.author.bot) return;
    if (newMessage.channel.type === 'dm') return;
    if (newMessage.content === oldMessage.content) return;
    if (newMessage.author.id == '507367752391196682') {
        client.emit('message', newMessage);
    } if (!data) return;
    if (!newMessage.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
    newMessage.guild.cacheLogs = data;
    const attachment = newMessage.attachments.find(item => image(item?.proxyURL))?.proxyURL
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

    if (attachment && image(attachment)) {
        const Canvas = require('canvas');
        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext('2d')
        const bck = await Canvas.loadImage(attachment);
        ctx.drawImage(bck, 0, 0, 300, 300);
        const att = new Discord.MessageAttachment(canvas.toBuffer(), 'img.png')
        embed.attachFiles(att)
            .setImage('attachment://img.png')
    }

    return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(() => { })

};