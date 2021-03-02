const Discord = require("discord.js");
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.VoiceState} oldState 
 * @param {Discord.VoiceState} newState 
 */
module.exports = async (client, oldState, newState) => {

    const guild = newState.guild;
    let data = guild.cacheLogs || (await require('../../models/logs').findOne({ id: guild.id }))
    if (!data) return;
    if (!guild.channels.cache.map(a => a?.id).includes(data.channellogs)) {
        guild.cacheLogs = null;
        return require('../../models/logs').deleteOne({ id: guild.id });
    }
    guild.cacheLogs = data;

    if (oldState.channel && !newState.channel) {
        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setAuthor(oldState?.member?.user?.tag || '\u200b', oldState.member?.user?.displayAvatarURL({ dynamic: true }) || 'https://media.discordapp.net/attachments/541473170105040931/816408806778470490/unknown.png')
            .setDescription(`Un miembro ha salido del canal de voz llamado: ${oldState.channel.name}`)

        let wbk = new Discord.Webhook(guild.cacheLogs.idWeb, guild.cacheLogs.tokenWeb)
        try {
            wbk.send(embed).catch(() => { })
        } catch { null }
    }

    else if (!oldState.channel && newState.channel) {
        let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTimestamp()
            .setAuthor(oldState?.member?.user?.tag || '\u200b', oldState.member?.user?.displayAvatarURL({ dynamic: true }) || 'https://media.discordapp.net/attachments/541473170105040931/816408806778470490/unknown.png')
            .setDescription(`Un miembro ha entrado al canal de voz llamado: ${newState.channel.name}`)

        let wbk = new Discord.Webhook(guild.cacheLogs.idWeb, guild.cacheLogs.tokenWeb)
        try {
            wbk.send(embed).catch(() => { })
        } catch { null }
    }

    else if ((newState.channel && oldState.channel) && (oldState.channelID != newState.channelID)) {

        let embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTimestamp()
            .setAuthor(oldState?.member?.user?.tag || '\u200b', oldState.member?.user?.displayAvatarURL({ dynamic: true }) || 'https://media.discordapp.net/attachments/541473170105040931/816408806778470490/unknown.png')
            .setDescription(`Un miembro ha entrado al canal de voz llamado: ${newState.channel.name} y salio de ${oldState.channel.name}`)

        let wbk = new Discord.Webhook(guild.cacheLogs.idWeb, guild.cacheLogs.tokenWeb)
        try {
            wbk.send(embed).catch(() => { })
        } catch (e) {
            console.log(e)
        }
    }

}