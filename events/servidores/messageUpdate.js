const Discord = require("discord.js");
const image = require('is-image');

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} oldMessage 
 * @param {Discord.Message} newMessage 
 */

module.exports = async (client, oldMessage, newMessage) => {

    if (!newMessage.guild || !oldMessage.guild) return;
    let data = newMessage.guild.cacheLogs || (await client.getData({ id: newMessage.guild.id }, 'logs'))
    if (!oldMessage.author || !newMessage.author || newMessage.author.bot) return;
    if (newMessage.channel.type === 'dm') return;
    if (newMessage.content === oldMessage.content) return;
    if (newMessage.author.id == '507367752391196682') {
        client.emit('message', newMessage);
    } if (!data) return;

    newMessage.guild.cacheLogs = data;
    const attachment = newMessage.attachments.find(item => image(item?.proxyURL))
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

    if (attachment && await image(attachment.proxyURL)) {
        try {
            const Canvas = require('canvas');
            const canvas = Canvas.createCanvas(attachment.width, attachment.height);
            const ctx = canvas.getContext('2d')
            const bck = await Canvas.loadImage(attachment.proxyURL);
            ctx.drawImage(bck, 0, 0, attachment.width, attachment.height);
            const att = new Discord.MessageAttachment(canvas.toBuffer(), 'img.png')
            embed.attachFiles(att)
                .setImage('attachment://img.png')
        } catch {
            ''
        }
    }

    let wbk = new Discord.WebhookClient(newMessage.guild.cacheLogs.idWeb, newMessage.guild.cacheLogs.tokenWeb)
    try {
        wbk.send({ embeds: [embed] })
    } catch (e) {
        console.log(e)
    }
};