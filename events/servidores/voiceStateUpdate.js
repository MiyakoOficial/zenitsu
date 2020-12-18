// eslint-disable-next-line no-unused-vars
const { VoiceState } = require('discord.js');

/**
 * 
 * @param {import('discord.js').Client} client 
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 */

module.exports = (client, oldState, newState) => {
    let canales = newState.guild.channels.cache.filter(a => a.type == 'voice');
    let canal = canales.find(a => a.members.get(client.user.id));
    let player = client.erela.get(newState.guild.id);
    if (!player) return;
    if (canal.members.filter(a => !a.user.bot).size == 0) return player.destroy();
}