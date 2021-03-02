const Discord = require("discord.js");
const image = require('is-image');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.VoiceState} oldState 
 * @param {Discord.VoiceState} newState 
 */
module.exports = async (client, oldState, newState) => {
    console.log('a')
    const guild = newState.guild;
    let data = guild.cacheLogs || (await require('../../models/logs').findOne({ id: guild.id }))
    if (!data) return;
    if (!guild.channels.cache.map(a => a?.id).includes(data.channellogs)) {
        guild.cacheLogs = null;
        return require('../../models/logs').deleteOne({ id: guild.id });
    }
    guild.cacheLogs = data;

    if (oldState.channel && !newState.channel) {
        console.log('a')
        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setAuthor(oldState?.member?.user?.tag || '\u200b', oldState.member?.user?.displayAvatarURL({ dynamic: true }) || 'https://media.discordapp.net/attachments/541473170105040931/816408806778470490/unknown.png')
            .setDescription(`Un miembro ha salido del canal de voz llamado ${oldState.channel.name}`)

        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(() => { })

    }

    else if (!oldState.channel && newState.channel) {
        console.log('a')
        let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTimestamp()
            .setAuthor(oldState?.member?.user?.tag || '\u200b', oldState.member?.user?.displayAvatarURL({ dynamic: true }) || 'https://media.discordapp.net/attachments/541473170105040931/816408806778470490/unknown.png')
            .setDescription(`Un miembro ha entrado al canal de voz llamado ${oldState.channel.name}`)

        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(() => { })

    }
}