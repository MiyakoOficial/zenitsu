const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    print(`${client.user.tag} está listo!`)
});

client.on('message', async (message) => {
    const prefix = 'log!'
    if (message.author.bot) return;

    if (message.content.startsWith(prefix + 'help')) {
        message.channel.send('Que pex?')
    }
});

client.login('NzIxMDgwMTkzNjc4MzExNTU0.XuPUVg.wvxc3MlUakZVsxvaqLH4hxwK35o')