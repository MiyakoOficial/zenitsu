const Discord = require("discord.js");
const image = require('is-image');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */
module.exports = async (client, message) => {

    if (!message) return;
    if (!message.author) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    const attachment = message.attachments.find(item => image(item?.proxyURL))
    if (!message.content && !(image(attachment?.proxyURL || 'poto'))) return;

    if (message.content) {
        await client.updateData({ id: message.channel.id }, { date: Date.now(), nombre: message.author.tag, avatarURL: message.author.displayAvatarURL({ dynamic: true }), mensaje: message.content }, 'snipe').catch(() => { })
    }
    let data = message.guild.cacheLogs || (await require('../../models/logs').findOne({ id: message.guild.id }))
    if (!data) return;

    message.guild.cacheLogs = data;
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle('<:zsMessageDelete:709728834915794974> Message Deleted')
        .addField('• Message', message.content.slice(0, 1024) || '\u200b')
        .addField('• Author', message.author.tag, true)
        .addField('• Author ID', message.author.id, true)
        .addField('• Author mention', `<@${message.author.id}>`, false)
        .addField('• Author channel name', message.channel.name, true)
        .addField('• Author channel ID', message.channel.id, true)
        .addField('• Author channel mention', `<#${message.channel.id}>`, false)
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setTimestamp()

    if (attachment && image(attachment.proxyURL || 'poto')) {
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

    let wbk = new Discord.Webhook(message.guild.cacheLogs.idWeb, message.guild.cacheLogs.tokenWeb)
    try {
        wbk.send(embed).catch(() => { })
    } catch (e) {
        console.log(e)
    }
};