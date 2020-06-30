const color = "#E09E36";
const LogsModel = require('../src/Guild.js')
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const { info } = require('console');
const mil = require("ms")


function duration(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (hrs <= 0) {
        if (mins <= 0) {
            return secs + " s";
        } else {
            return mins + " m " + secs + " s";
        }
    } else {
        return hrs + " h " + mins + " m " + secs + " s";
    }
}

client.on('ready', () => {
    console.log(`${client.user.tag} está listo!`)
    client.user.setPresence({
        status: "online",
        activity: {
            name: "z!help",
            type: "LISTENING"
        }

    })
    setInterval(() => {
        client.channels.cache.get('705741696322895983').setName(`Ping: ${client.ws.ping} ms`)
        client.channels.cache.get('707986771085885581').setName(`Servidores: ${client.guilds.cache.size}`)
        client.channels.cache.get('707988731507900468').setName(`Usuarios: ${client.users.cache.size}`)
    }, mil('5m'))

    let embed = new Discord.MessageEmbed()
        .setColor(color)
        .addField('Color', color, true)
        .addField('Nombre', client.user.tag, true)
        .addField('Versión', Discord.version, true)
        .addField('Servidores', client.guilds.cache.size, true)
        .addField('Usuarios', client.users.cache.size, true)
        .addField('Canales', client.channels.cache.size, true)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setFooter(client.users.cache.get('507367752391196682').tag, client.users.cache.get('507367752391196682').displayAvatarURL({ format: 'png', size: 2048 }));
    client.users.cache.get('507367752391196682').send({ embed: embed }).catch(err => console.log(err))
});

client.on('message', async (message) => {

    function errorEmbed(argumentoDeLaDescripcion) {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`¡<:ohno:721174460073377804> => \`Error\`: ${argumentoDeLaDescripcion}!`)
            .setColor(color)
            .setTimestamp()
        )
    }

    function embedResponse(argumentoDeLaDescripcion) {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(argumentoDeLaDescripcion)
            .setColor(color)
            .setTimestamp()
        )
    }

    const prefix = 'z!'
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    //inicio de help
    if (command === 'help') {
        message.channel.send({
            embed: new Discord.MessageEmbed()
                .setColor(color)
                .addField('Comandos', 'z!help, z!setlogs, z!ping, z!canal, z!suggest')
                .addField('Extras', 'z!txt, z!js, z!ruby')
                .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
        }).catch(err => console.log(err))
    }
    //fin de help
    //inicio suggest
    if (command === 'suggest') {
        if (!args[0]) return embedResponse('Escribe algo!')
        new Discord.WebhookClient('726105436503146587', 'a4RkLOAs8nWw3_laerlEjIH_z8ekvph-EHXRi0JaWpu_3B7x10iWEZjuGPR6ujgngY94')
            .send(`${message.author.username} ha sugerido:\n${args.join(' ')}`).then(a => {
                embedResponse('Sugerencia enviada!')
            })
    }
    //fin suggest
    //inicio de extras
    //inicio de txt
    if (command === 'txt') {
        if (!args[0]) return embedResponse('Escribe algo!')
        message.channel.send({
            files: [{
                attachment: Buffer.from(args.join(' ')),
                name: "Text.txt"
            }]
        }).catch(err => console.log(err))
    }
    //fin de txt
    //inicio de js
    if (command === 'js') {
        if (!args[0]) return embedResponse('Escribe algo!')
        message.channel.send({
            files: [{
                attachment: Buffer.from(args.join(' ')),
                name: "JavaScript.js"
            }]
        }).catch(err => console.log(err))
    }
    //fin de js
    //inicio de ruby
    if (command === 'ruby') {
        if (!args[0]) return embedResponse('Escribe algo!')
        message.channel.send({
            files: [{
                attachment: Buffer.from(args.join(' ')),
                name: "Ruby.rb"
            }]
        }).catch(err => console.log(err))
    }
    //fin de ruby
    //fin de extras

    //comienzo de eval
    if (command === 'eval') {
        if (!["507367752391196682", "433415551868600321"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!').catch(err => console.log(err));
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
            }).catch(err => console.log(err))
            let embed = new Discord.MessageEmbed()
                .setTitle(`Eval`)
                .addField(`Entrada`, `\`\`\`js\n${code}\`\`\``)
                .addField(`Salida`, `\`\`\`js\n${evalued}\n\`\`\``.replace(client.token, "Contenido privado").replace(client.key, "Contenido privado").replace(client.googleapikey, "Contenido privado"))
                .addField(`Tipo`, `\`\`\`js\n${asd}\`\`\``.replace("number", "Number").replace("object", "Object").replace("string", "String").replace(undefined, "Undefined").replace("boolean", "Boolean").replace("function", "Function"))
                .setColor(color)
                .setTimestamp()
            message.channel.send(embed).catch(err => console.log(err))
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``).catch(err => console.log(err));
        }
    }
    //fin de eval

    //inicio de ping
    if (command === 'ping') {
        embedResponse(`Ping: ${client.ws.ping}ms`).catch(err => console.log(err))
    }
    //fin de ping

    //mongoose
    //comienzo de setlogs
    if (command === 'setlogs') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return embedResponse("No tienes el permiso `ADMINISTRATOR`").catch(err => console.log(err));
        let channel = message.mentions.channels.first();
        if (!channel) return embedResponse("No has mencionado un canal/Ese canal no existe.").catch(err => console.log(err));
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(channel.id)) return embedResponse('El canal tiene que ser del Servidor donde estas!').catch(err => console.log(err));
        let data = await LogsModel.findOne({ id: message.guild.id });
        if (!data) {
            try {
                const configLogs = new LogsModel({
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
        return embedResponse(`Canal establecido en <#${channel.id}>`).catch(err => console.log(err))
    }
    //fin de setlogs
    //inicio de canal
    if (command === 'canal') {
        await LogsModel.findOne({ id: message.guild.id }, async (err, data) => {
            if (err) return console.log(err);

            if (!data) return embedResponse("Este servidor no tiene definido un canal de logs").catch(err => console.log(err));
            else return embedResponse(`Logs: ${data.channellogs}`).catch(err => console.log(err));
        });
    }
    //fin de canal
    //mongoose
});
//inicio de eventos
client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (!newMessage.guild || !oldMessage.guild) return;
    await LogsModel.findOne({ id: newMessage.guild.id }, async (err, data) => {
        if (newMessage.author.bot) return;
        if (newMessage.channel.type === 'dm') return;
        if (newMessage.content === oldMessage.content) return;
        if (!newMessage.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('<:messageUpdate:723267945194586122> Message Updated')
            .addField('• Old message', oldMessage.content, true)
            .addField('• New message', newMessage.content, true)
            .addField('• Link', `[Link of the message](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`, false)
            .addField('• Author', newMessage.author.tag, true)
            .addField('• Author ID', newMessage.author.id, true)
            .addField('• Author mention', `<@${newMessage.author.id}>`, false)
            .addField('• Author channel', newMessage.channel.name, true)
            .addField('• Author channel ID', newMessage.channel.id, true)
            .addField('• Author channel mention', `<#${newMessage.channel.id}>`, false)
            .setFooter(newMessage.guild.name, newMessage.guild.iconURL({ format: 'png', size: 2048 }))
            .setTimestamp()
        if (data.channellogs === 'defaultValue') return console.log('No se ha establecido ningun canal en el servidor ' + newMessage.guild.name + '')
        if (err) return console.log(err);
        if (!data) return console.log('Error!')
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});

client.on('messageDelete', async (message) => {
    await LogsModel.findOne({ id: message.guild.id }, async (err, data) => {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('<:messageDelete:723270093475414026> Message Deleted')
            .addField('• Message', message.content)
            .addField('• Author', message.author.tag, true)
            .addField('• Author ID', message.author.id, true)
            .addField('• Author mention', `<@${message.author.id}>`, false)
            .addField('• Author channel', message.channel.name, true)
            .addField('• Author channel ID', message.channel.id, true)
            .addField('• Author channel mention', `<#${message.channel.id}>`, false)
            .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', size: 2048 }))
            .setTimestamp()
        if (data.channellogs === 'defaultValue') return console.log('No se ha establecido ningun canal en el servidor ' + newMessage.guild.name + '')
        if (err) return console.log(err);
        if (!data) return console.log('Error!')
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});

client.on('roleUpdate', async (oldRole, newRole) => {
    try {
        let myLogs = await newRole.guild.fetchAuditLogs({ type: 31 })
        //Primera entrada
        let myEntry = myLogs.entries.first(2)[1]
        //Cambios.
        let myChange = myEntry.changes.find(e => e.key === "permissions");
        if (!myChange) return;
        let tosee = [new Discord.Permissions(myChange.old).toArray(), new Discord.Permissions(myChange.new).toArray()]
        console.log(tosee[0]) //Viejo
        console.log(tosee[1]) //Nuevo
    } catch (a) { console.log(a) }
    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {
        if (oldRole.permissions.bitfield === newRole.permissions.bitfield) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• New permissions', newRole.permissions.toArray().join(' | '), true)
            .addField('• Role name', newRole.name, true)
            .addField('• Role ID', newRole.id, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        newRole.guild.fetchAuditLogs()
            .then(audit => console.log(audit.entries.first()))
            .catch(console.error);
        if (data.channellogs === 'defaultValue') return console.log('No se ha establecido ningun canal en el servidor ' + newRole.guild.name)
        if (err) return console.log(err);
        if (!data) return console.log('Error!')
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});

client.on('roleUpdate', async (oldRole, newRole) => {
    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {
        if (oldRole.name === newRole.name) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Old name', oldRole.name, true)
            .addField('• New name', newRole.name, true)
            .addField('• Role ID', newRole.id, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (data.channellogs === 'defaultValue') return console.log('No se ha establecido ningun canal en el servidor ' + newRole.guild.name + '')
        if (err) return console.log(err);
        if (!data) return console.log('Error!')
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});

client.on('guildUpdate', async (oldGuild, newGuild) => {
    await LogsModel.findOne({ id: newGuild.id }, async (err, data) => {
        if (oldGuild.name === newGuild.name) return;
        if (!newGuild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Guild Updated')
            .addField('• Old name', oldGuild.name, true)
            .addField('• New name', newGuild.name, true)
            .addField('• Guild ID', newGuild.id, true)
            .setTimestamp()
            .setFooter(newGuild.name, newGuild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (data.channellogs === 'defaultValue') return console.log('No se ha establecido ningun canal en el servidor ' + newGuild.name + '')
        if (err) return console.log(err);
        if (!data) return console.log('Error!')
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});


client.on('roleUpdate', async (oldRole, newRole) => {
    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {
        if (oldRole.hexColor === newRole.hexColor) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Old color', oldRole.hexColor, true)
            .addField('• New color', newRole.hexColor, true)
            .addField('• Role', `${newRole.name}(${newRole.id})`, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (data.channellogs === 'defaultValue') return console.log('No se ha establecido ningun canal en el servidor ' + newRole.guild.name + '')
        if (err) return console.log(err);
        if (!data) return console.log('Error!')
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') }); // doc.channellogs o como hayas definido el canal de logs (supongo que para eso estás usando esta config)
    });
});

//fin de eventos
client.login(process.env.BOT_TOKEN)

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("[MongoDB]: Conectado a la base de datos Mongodb.");
}).catch((err) => {
    console.log(`[Error]: No se puede conectar a la base de datos de Mongodb. Error: ${err}`);
});
