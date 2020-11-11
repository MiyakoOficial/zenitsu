const Discord = require("discord.js")

module.exports = {
    config: {
        name: "estructura", //nombre del cmd
        alias: [], //Alias
        description: "Ver la estructura del servidor", //Descripción (OPCIONAL)
        usage: "z!estructura",
        category: 'utiles'
    },
    run: ({ message }) => {

        let printT = message.guild.channels.cache.filter(a => a.type == 'category').sort((a, b) => a.position - b.position);

        printT = printT.map(cat => {

            return `[📁] ${cat.name}${cat.children.filter(a => a.type != 'voice').sort((a, b) => a.position - b.position).map(a => `\n\t${name(a)}`).join('')}${cat.children.filter(a => a.type == 'voice').sort((a, b) => a.position - b.position).map(a => `\n\t[🔊] ${a.name}${membersInfoInChannel(a)}`).join('')}`

        })

        let res = Discord.Util.splitMessage(printT, { maxLength: 1900 });


        res.forEach(a => message.channel.send(a, { code: '' }))

        function membersInfoInChannel(channel) {

            let str = '';

            let streaming = channel.members.array().filter(a => a.voice.streaming);
            streaming = streaming.map(a => a.displayName.toLowerCase()).sort()
            streaming.forEach(a => {

                let member = message.guild.members.cache.find(e => e.displayName.toLowerCase() === a)
                str += member.user.bot ? `\n\t\t[${emojisVoice(member, '🎧🤖', '🤖')}] ${member.displayName} [EN DIRECTO]` : `\n\t\t[${emojisVoice(member, '🧏', '🙎')}] ${member.displayName} [EN DIRECTO]`
            });

            let noStreaming = channel.members.array().filter(a => !a.voice.streaming);
            noStreaming = noStreaming.map(a => a.displayName.toLowerCase()).sort()
            noStreaming.forEach(a => {

                let member = message.guild.members.cache.find(e => e.displayName.toLowerCase() === a)
                str += member.user.bot ? `\n\t\t[${emojisVoice(member, "🎧🤖", '🤖')}] ${member.displayName}` : `\n\t\t[${emojisVoice(member, '🧏', '🙎')}] ${member.displayName}`
            });
            return str

        }

    }
}

function name(a) {

    return a.type == 'text' ? `[💬] ${a.name}` : a.type == 'news' ? `[🔔] ${a.name}` : a.type == 'store' ? `[🏬] ${a.name}` : `[❓] ${a.name}`

}

function emojisVoice(member, deaf, normal) {

    return `${member.voice.selfMute || member.voice.serverMute ? '🔇' : ''}${member.voice.selfVideo ? '🎥' : ''}${member.voice.selfDeaf || member.voice.serverDeaf ? deaf : normal}`

}