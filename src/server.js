//ESTE CODIGO NO AFECTARA SU BOT, SCRIPT DE ARRANQUE
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
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

    //inicio de help
    if (command === 'help') {
        message.channel.send('Que pex?')
    }
    //fin de help

    //comienzo de eval
    if (command === 'eval') {
        if (!["507367752391196682"].includes(message.author.id)) {
            return;
        }
        try{
        message.channel.send(`\`\`\`${eval(args.join(' '))}\`\`\``)
    }catch(e){ console.log(`Error: ${e}`)
}
}
    //fin de eval

    //inicio de reset
if(command === 'reset'){
    if (!["507367752391196682"].includes(message.author.id)) {
        return;
    }
    else{
        message.channel.send(`${client.user.tag} resetandose!`).then(a => }{
            client.destroy()
            process.exit()
        })
    }
}
    //fin de reset
});

client.login(process.env.BOT_TOKEN)