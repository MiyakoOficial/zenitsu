// eslint-disable-next-line no-unused-vars
const { VoiceState } = require('discord.js');

/**
 * 
 * @param {import('discord.js').Client} client 
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 */

module.exports = (client, oldState, newState) => {
    let player = client.erela.get(newState.guild.id);
    let canalVoz = newState.channel;
    if (!canalVoz && player) player.destroy();
}