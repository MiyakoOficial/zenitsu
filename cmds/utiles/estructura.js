const Discord = require("discord.js")

module.exports = {
    config: {
        name: "estructura", //nombre del cmd
        alias: [], //Alias
        description: "Ver la estructura del servidor", //Descripción (OPCIONAL)
        usage: "z!estructura",
        category: 'utiles'
    },
    run: async ({ client, message, args, embedResponse }) => {

        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member

        let res = Discord.Util.splitMessage(Discord.Util.discordSort(message.guild.channels.cache.sort((a, b) => a.rawPosition - b.rawPosition).filter(channel => channel.type == "category" && channel.permissionsFor(user).has('VIEW_CHANNEL'))).map(x => `[📂] ${x.name}\n\t${x.children.sort(Ordenar).filter(a => a.permissionsFor(user).has('VIEW_CHANNEL')).map(a => a.type == 'text' ? '[💬] ' + a.name : a.type == 'news' ? '[🔔] ' + a.name : a.type == 'voice' ? '[🔊] ' + a.name + voiceChannelMembers(a) : a.name).join('\n\t')}\t`), { maxLength: 1950, char: '' });
        res.forEach(a => message.channel.send(`Estructura de ${user.user.tag}.\n${res}`, { code: '' }).catch(() => { }));

        function voiceChannelMembers(channel) {
            let str = '';
            const members = channel.members;
            const stream = members.filter((x) => x.voice.streaming).map((x) => x.displayName.toLowerCase());
            const nostream = members.filter((x) => !x.voice.streaming).map((x) => x.displayName.toLowerCase());
            stream.sort();
            nostream.sort();
            stream.forEach((u) => {
                const m = message.guild.members.cache.find((x) => x.displayName.toLowerCase() === u);
                str += m.user.bot ? "\n\t\t[🤖] " + m.displayName : '\n\t\t[🙎] ' + m.displayName + ' [Transmitiendo]';
            });
            nostream.forEach((u) => {
                const m = message.guild.members.cache.find((x) => x.displayName.toLowerCase() === u);
                str += m.user.bot ? "\n\t\t[🤖] " + m.displayName : '\n\t\t[🙎] ' + m.displayName;
            });

            return str;
        };

    }
}

function Ordenar(canal1, canal2) {
    if (canal2.type == "voice" && canal1.type != "voice") return -1
    return (canal1.type != "voice" || canal2.type == "voice") ? canal1.position - canal2.position : 1
};