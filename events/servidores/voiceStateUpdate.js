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
    if (newState.member.user.id == client.user.id && !canalVoz && player && [oldState.channelID, newState.channelID].includes(player.voiceChanel)) return player.destroy();
    else if (oldState.channel && !canalVoz && player && [oldState.channelID, newState.channelID].includes(player.voiceChanel)) {
        if (oldState.channel.members.filter(a => !a.user.bot).size == 0) return player.destroy();
    }
}