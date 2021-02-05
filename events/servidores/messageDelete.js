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
    const attachment = message.attachments.find(item => image(item?.proxyURL))?.proxyURL
    if (!message.content && !(image(attachment || 'poto'))) return;
    await client.updateData({ id: message.channel.id }, { nombre: message.author.tag, avatarURL: message.author.displayAvatarURL({ dynamic: true }), mensaje: message.content }, 'snipe')
    let data = message.guild.cacheLogs || (await require('../../models/logs').findOne({ id: message.guild.id }))
    if (!data) return;
    if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return require('../../models/logs').deleteOne({ id: message.guild.id });
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