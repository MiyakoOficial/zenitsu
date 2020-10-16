const Discord = require("discord.js");
const ayuda = 'elsuperduperincreibleseparadordearraysencaminoxdxd:v:vxdxdestonadieloescribiranuncaxdxdhdsbasudkjbsdjnasiudhaskkdhbdjfasdfilshdvfaciludvshfilahsdvfcliuasdbvfcilukjbsdvfiulKJVIUHJIOSDHADUJohifjbdsofihbsfihjbsdfiohbaiaslhabodhb'


module.exports = async (client, message) => {

    if (!message) return;
    if (!message.author) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content) return;
    await client.updateData({ id: message.channel.id }, { snipe: `${message.content}${ayuda}<@${message.author.id}>` }, 'snipe')

    let data = (await client.getData({ id: message.guild.id }, 'logs'))

    if (!data) return;
    if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle('<:messageDelete:723270093475414026> Message Deleted')
        .addField('• Message', message.content)
        .addField('• Author', message.author.tag, true)
        .addField('• Author ID', message.author.id, true)
        .addField('• Author mention', `<@${message.author.id}>`, false)
        .addField('• Author channel name', message.channel.name, true)
        .addField('• Author channel ID', message.channel.id, true)
        .addField('• Author channel mention', `<#${message.channel.id}>`, false)
        .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', size: 2048 }))
        .setTimestamp()
    return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(e => { })

};