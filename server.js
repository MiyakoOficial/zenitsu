//ESTE CODIGO NO AFECTARA SU BOT, SCRIPT DE ARRANQUE

const http = require('http');
const express = require('express');
const app = express();
const { exec } = require('child_process');

app.use(express.static('public'));

app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
    response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
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
            message.channel.send('No puedes usar el comando!')
        }
        message.channel.send(eval(args.join(' ')))
    }
    //fin de eval

    //inicio de refresh
    if (command === 'refresh') {
        if (!["507367752391196682"].includes(message.author.id)) {
            message.channel.send('No puedes usar el comando!')
        }
        exec('git pull master')
    }
    //fin de refresh
});

client.login(config.token)