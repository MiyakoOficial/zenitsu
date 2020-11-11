/*const Discord = require("discord.js");
const ms = require('ms');*/

module.exports = async (client, reaction, user) => {

    if (!reaction.message.channel.guild) return;
    if (user.bot) return;
    let message = reaction.message;
    let guild = message.guild;
    //let channel = message.channel;
    let emoji = reaction.emoji;
    let member = guild.member(user);

    let { idMessage } = await client.getData({ id: guild.id }, 'muteid');

    if (!idMessage || idMessage === 'id') return;

    if (message.id != idMessage) return;

    //console.log(member.voice.channel)

    if (emoji.id === '751908729930121376') {

        /*if (cooldownR.has(user.id)) {
            return response('Estas en cooldown de 3s!', user).catch(a => { })
        }*/

        let canalVoz = member.voice.channel;

        /*cooldownR.add(user.id);
        setTimeout(() => {
            cooldownR.delete(user.id)
        }, ms('3s'))*/

        //unmute
        await client.among(reaction.message, member, canalVoz, user, false)//
        await reaction.users.remove(user).catch(() => { })
    }

    else if (emoji.id === '751908729624068226') {

        /*if (cooldownR.has(user.id)) {
            return response('Estas en cooldown de 3s!', user).catch(a => { })
        }*/
        let canalVoz = member.voice.channel;

        /*cooldownR.add(user.id);
        setTimeout(() => {
            cooldownR.delete(user.id)
        }, ms('3s'))*/
        //mute
        await client.among(reaction.message, member, canalVoz, user, true)//
        await reaction.users.remove(user).catch(() => { })
    }

}