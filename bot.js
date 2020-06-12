const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`${client.user.tag} está listo!`)
    client.user.setPresence({
        status: "online",
        activity: {
            name: "log!help",
            type: "PLAYING"
        }
    })
});

client.on('message', async (message) => {
    const prefix = 'log!'

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (message.author.bot) return;

    if (command === 'help') {
        message.channel.send('Que pex?')
    }

    if (command === 'eval') {
        if (!["507367752391196682"].includes(message.author.id)) {
            message.channel.send('No puedes usar el comando!')
        }
        message.channel.send(await eval(args.join(' ')))
    }
});

client.login('NzIxMDgwMTkzNjc4MzExNTU0.XuPUVg.wvxc3MlUakZVsxvaqLH4hxwK35o')