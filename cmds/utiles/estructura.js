const Discord = require("discord.js")

module.exports = {
    config: {
        name: "estructura", //nombre del cmd
        alias: [], //Alias
        description: "Ver la estructura del servidor", //Descripción (OPCIONAL)
        usage: "z!estructura",
        category: 'utiles'
    },
    run: ({ message, args }) => {

        let memberXD = message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(a => a.displayName == args.join(' ') || a.user.tag == args.join(' ') || a.user.username == args.join(' ')) || message.mentions.members.first() || message.member;

        let printT = message.guild.channels.cache.filter(a => a.type == 'category').filter(a => a.permissionsFor(memberXD).has('VIEW_CHANNEL')).sort((a, b) => a.position - b.position);

        printT = printT.map(cat => {

            return `[📁] ${cat.name}${cat.children.filter(a => a.permissionsFor(memberXD).has('VIEW_CHANNEL')).filter(a => a.type != 'voice').sort((a, b) => a.position - b.position).map(a => `\n\t${name(a)}`).join('')}${cat.children.filter(a => a.permissionsFor(memberXD).has('VIEW_CHANNEL')).filter(a => a.type == 'voice').sort((a, b) => a.position - b.position).map(a => `\n\t[🔊] ${a.name}${membersInfoInChannel(a)}`).join('')}`

        })

        let res = Discord.Util.splitMessage(printT, { maxLength: 1900 });

        message.channel.send(`**Estructura de ${memberXD.user.tag}**`)
        res.forEach(a => message.channel.send(a, { code: '' }))

        function membersInfoInChannel(channel) {

            let str = '';

            let streaming = sortMembers(channel.members.array().filter(a => a.voice.streaming));
            streaming = streaming.map(member => member.user.bot ? `\n\t\t[${emojisVoice(member, '🎧🤖', '🤖')}] ${member.displayName} [EN DIRECTO]` : `\n\t\t[${emojisVoice(member, '🧏', '🙎')}] ${member.displayName} [EN DIRECTO]`)
            streaming.forEach(a => {

                str += a

            });

            let noStreaming = channel.members.array().filter(a => !a.voice.streaming);
            noStreaming = noStreaming.map(member => member.user.bot ? `\n\t\t[${emojisVoice(member, "🎧🤖", '🤖')}] ${member.displayName}` : `\n\t\t[${emojisVoice(member, '🧏', '🙎')}] ${member.displayName}`)
            noStreaming.forEach(a => {
                str += a
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

function sortMembers(members) {

    let items = members
    items.sort(function (a, b) {
        if (a.displayName > b.displayName) {
            return 1;
        }
        if (a.displayName < b.displayName) {
            return -1;
        }
        return 0;
    });
    return items;
}