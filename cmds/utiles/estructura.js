const Discord = require("discord.js")

module.exports = {
    config: {
        name: "estructura",//Nombre del cmd
        alias: [], //Alias
        description: "Ver la estructura del servidor", //Descripción (OPCIONAL)
        usage: "z!estructura",
        category: 'utiles'
    },
    run: async ({ client, message, args, embedResponse }) => {

        let user = client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(() => { }) || message.mentions.members.first() || message.author

        res = Discord.Util.splitMessage(Discord.Util.discordSort(message.guild.channels.cache.filter(channel => channel.type == "category" && channel.permissionsFor(user).has('VIEW_CHANNEL'))).map(x => `[📂] ${x.name}\n\t${x.children.filter(a => a.permissionsFor(user).has('VIEW_CHANNEL')).map(a => a.type == 'text' ? '[💬] ' + a.name : a.type == 'news' ? '[🔔] ' + a.name : a.type == 'voice' ? '[🔊] ' + a.name + voiceChannelMembers(a) : a.name).join('\n\t')}\t`));
        message.channel.send('Estructura del servidor.')
        res.forEach(a => message.channel.send(a, { code: '' }).catch(() => { }));

        function voiceChannelMembers(channel) {
            let str = '';
            const members = channel.members;
            const stream = members.filter((x) => x.voice.streaming).map((x) => x.displayName.toLowerCase());
            const nostream = members.filter((x) => !x.voice.streaming).map((x) => x.displayName.toLowerCase());
            stream.sort();
            nostream.sort();
            stream.forEach((u) => {
                const m = message.guild.members.cache.find((x) => x.displayName.toLowerCase() === u);
                str += '\n\t\t[🙎] ' + m.displayName + ' [Transmitiendo]';
            });
            nostream.forEach((u) => {
                const m = message.guild.members.cache.find((x) => x.displayName.toLowerCase() === u);
                str += '\n\t\t[🙎] ' + m.displayName;
            });

            return str;
        };

    }
}