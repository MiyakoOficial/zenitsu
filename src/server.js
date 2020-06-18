//ESTE CODIGO NO AFECTARA SU BOT, SCRIPT DE ARRANQUE
const color = 0xff0000;
const GuildModel = require('../src/Guild.js')
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
        message.channel.send({
            embed: new Discord.MessageEmbed()
                .setColor(color)
                .setDescription('Comando: log!setlogs')
                .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
        })
    }
    //fin de help

    //comienzo de eval
    if (command === 'eval') {
        if (!["507367752391196682", "433415551868600321"].includes(message.author.id))
            return message.channel.send(
                "Solo los desarolladores pueden usar esto!"
            );
        let limit = 1950;
        try {
            let code = args.join(" ");
            let evalued = await eval(code);
            let asd = typeof (evalued)
            evalued = require("util").inspect(evalued, { depth: 0 });
            let txt = "" + evalued;
            let limit = 1024
            if (txt.length > limit) return (txt, "js").then(p => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Eval`)
                    .addField(`Entrada`, `\`\`\`js\n${code}\`\`\``)
                    .addField(`Salida`, `[Click aquí](${p})`)
                    .addField(`Tipo`, `\`\`\`js\n${asd}\`\`\``.replace("number", "Number").replace("object", "Object").replace("string", "String").replace(undefined, "Undefined").replace("boolean", "Boolean").replace("function", "Function"))
                    .setColor(color)
                    .setTimestamp()
                message.channel.send(embed)
            })
            let embed = new Discord.MessageEmbed()
                .setTitle(`Eval`)
                .addField(`Entrada`, `\`\`\`js\n${code}\`\`\``)
                .addField(`Salida`, `\`\`\`js\n${evalued}\n\`\`\``.replace(client.token, "Contenido privado").replace(client.key, "Contenido privado").replace(client.googleapikey, "Contenido privado"))
                .addField(`Tipo`, `\`\`\`js\n${asd}\`\`\``.replace("number", "Number").replace("object", "Object").replace("string", "String").replace(undefined, "Undefined").replace("boolean", "Boolean").replace("function", "Function"))
                .setColor(color)
                .setTimestamp()
            message.channel.send(embed)
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
        }
    }
    //fin de eval
    //mongoose
    //comienzo de setlogs
    if (command === 'setlogs') {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.reply("Ese canal no existe.");
        let data = await GuildModel.findOne({ id: message.guild.id });
        if (!data) {
            try {
                const configLogs = new GuildModel({
                    id: message.guild.id,
                    channellogs: channel.id
                });
                configLogs.save().catch(e => { return console.log(e); });
            } catch { return; }
        } else {
            try {
                data.channellogs = channel.id;
                data.save().catch(e => { return console.log(e); });
            } catch { return; }
        }
        return message.reply(`Cambiado a <#${channel.id}>`)
    }
    //fin de setlogs
    if (command === 'canal') {
        await GuildModel.findOne({ id: message.guild.id }, async (err, data) => {
            if (err) return console.log(err);

            if (!data) return message.reply("Este servidor no tiene definido un canal de logs");
            else return message.reply(`Logs: ${data.channellogs}`); // doc.channellogs o como hayas definido el canal de logs (supongo que para eso estás usando esta config)
        });
    }
    //mongoose
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    await GuildModel.findOne({ id: newMessage.guild.id }, async (err, data) => {
        if (err) return console.log(err);

        if (!data) return console.log('Error!');
        else return client.channels.cache.get(data.channellogs).reply(`Logs: ${data.channellogs}`); // doc.channellogs o como hayas definido el canal de logs (supongo que para eso estás usando esta config)
    });
});

client.login(process.env.BOT_TOKEN)

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("[MongoDB] Conectado a la base de datos Mongodb.");
}).catch((err) => {
    console.log("[Error] No se puede conectar a la base de datos de Mongodb. Error: " + err);
});