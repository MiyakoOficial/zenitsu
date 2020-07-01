const { join } = require('path');
const color = "#E09E36";
const LogsModel = require('../src/Guild.js')
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const { info, error } = require('console');
const mil = require("ms")


/*function duration(s) {
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
}*/

client.on('ready', () => {
    console.log(`${client.user.tag} está listo!`)
    client.user.setPresence({
        status: "online",
        activity: {
            name: "z!help",
            type: "LISTENING"
        }

    })

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
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`¡<:ohno:721174460073377804> => \`Error\`: ${argumentoDeLaDescripcion}!`)
            .setColor(color)
            .setTimestamp()
        )
    }


    function embedResponse(argumentoDeLaDescripcion, opcion) {
        let canal_a_enviar = opcion || message.channel
        return canal_a_enviar.send(new Discord.MessageEmbed()
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
                .addField('Comandos', 'z!help, z!setlogs, z!canal, z!suggest, z!bugreport, z!blockchannels')
                .addField('Extras', 'z!txt, z!dm, z!ping')
                .addField('Diversion', 'pronto...')
                .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
        }).catch(err => console.log(err))
    }
    //fin de help

    //inicio de dm
    if (command === 'dm') {
        let user = message.mentions.users.first()
        if (!user) return embedResponse('Menciona a alguien!')
        if (!args[1]) return embedResponse('Escribe el mensaje a enviar!')
        try {
            let embeddm = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(args.slice(1).join(' ') + '\npor: ' + message.author.tag)
                .setTimestamp()
            user.send({ embed: embeddm }).then(a =>
                embedResponse(`<:correcto:721174526930714634> tratando de enviar!`))
        } catch (e) { return errorEmbed(e) }
    }
    //fin de dm

    //!inicio de blockchannels
    if (command === 'blockchannels') {
        if (!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS')) return errorEmbed('No tengo el permisos MANAGE_CHANNELS');
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return errorEmbed('No tienes el permiso MANAGE_CHANNELS');
        let canales = message.guild.channels.cache.filter(a => a.type === 'text');
        if (!args[1]) return embedResponse('Ejemplo: z!blockchannels <id de rol/user> <true | false | null>')
        if (!message.guild.roles.cache.get(args[0]) && !message.guild.users.cache.get(args[0])) return errorEmbed('Error en encontrar la ID de usuario/rol');
        if (['true', 'false', 'null'].includes(args[1])) return errorEmbed('Escoge entre true, false, null');
        canales.forEach(ch => {
            try {
                message.channel.send(`Editando ${ch.name}`);
                ch.updateOverwrite(args[0], {
                    SEND_MESSAGES: args[1]
                });
            } catch (e) { errorEmbed(e) };
        });
    };
    //!fin de blockchannels

    //inicio bugreport
    if (command === 'bugreport') {
        if (!args[0]) return embedResponse('Escribe algo!')
        embedResponse(`${message.author.tag} ha reportado el siguente \"bug\":\n${args.join(' ')}`, client.channels.cache.get('725053091522805787')).then(a => {
            embedResponse('Reporte enviado!')
        })
    }

    //fin de bugreport
    //inicio de suggest
    if (command === 'suggest') {
        if (!args[0]) return embedResponse('Escribe algo!')
        embedResponse(`${message.author.tag} ha sugerido:\n${args.join(' ')}`, client.channels.cache.get('727948582556270682')).then(a => {
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
            else return embedResponse(`Logs: <#${data.channellogs}>(${data.channellogs})`).catch(err => console.log(err));
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
    const listaAddeds = ['.']
    const listaRemoveds = ['.']
    if (!oldRole.permissions.has('ADMINISTRATOR') && newRole.permissions.has('ADMINISTRATOR')) listaAddeds.push('Administrator');
    if (oldRole.permissions.has('ADMINISTRATOR') && !newRole.permissions.has('ADMINISTRATOR')) listaRemoveds.push('Administrator');

    if (!oldRole.permissions.has('CREATE_INSTANT_INVITE') && newRole.permissions.has('CREATE_INSTANT_INVITE')) listaAddeds.push('Create instant invite');
    if (oldRole.permissions.has('CREATE_INSTANT_INVITE') && !newRole.permissions.has('CREATE_INSTANT_INVITE')) listaRemoveds.push('Create instant invite');

    if (!oldRole.permissions.has('KICK_MEMBERS') && newRole.permissions.has('KICK_MEMBERS')) listaAddeds.push('Kick members');
    if (oldRole.permissions.has('KICK_MEMBERS') && !newRole.permissions.has('KICK_MEMBERS')) listaRemoveds.push('Kick members');

    if (!oldRole.permissions.has('BAN_MEMBERS') && newRole.permissions.has('BAN_MEMBERS')) listaAddeds.push('Ban members');
    if (oldRole.permissions.has('BAN_MEMBERS') && !newRole.permissions.has('BAN_MEMBERS')) listaRemoveds.push('Ban members');

    if (!oldRole.permissions.has('MANAGE_CHANNELS') && newRole.permissions.has('MANAGE_CHANNELS')) listaAddeds.push('Manage channels');
    if (oldRole.permissions.has('MANAGE_CHANNELS') && !newRole.permissions.has('MANAGE_CHANNELS')) listaRemoveds.push('Manage channels');

    if (!oldRole.permissions.has('MANAGE_GUILD') && newRole.permissions.has('MANAGE_GUILD')) listaAddeds.push('Manage guild');
    if (oldRole.permissions.has('MANAGE_GUILD') && !newRole.permissions.has('MANAGE_GUILD')) listaRemoveds.push('Manage guild');

    if (!oldRole.permissions.has('ADD_REACTIONS') && newRole.permissions.has('ADD_REACTIONS')) listaAddeds.push('Add reactions');
    if (oldRole.permissions.has('ADD_REACTIONS') && !newRole.permissions.has('ADD_REACTIONS')) listaRemoveds.push('Add reactions');

    if (!oldRole.permissions.has('VIEW_AUDIT_LOG') && newRole.permissions.has('VIEW_AUDIT_LOG')) listaAddeds.push('View audit log');
    if (oldRole.permissions.has('VIEW_AUDIT_LOG') && !newRole.permissions.has('VIEW_AUDIT_LOG')) listaRemoveds.push('View audit log');

    if (!oldRole.permissions.has('PRIORITY_SPEAKER') && newRole.permissions.has('PRIORITY_SPEAKER')) listaAddeds.push('Priority speaker');
    if (oldRole.permissions.has('PRIORITY_SPEAKER') && !newRole.permissions.has('PRIORITY_SPEAKER')) listaRemoveds.push('Priority speaker');

    if (!oldRole.permissions.has('STREAM') && newRole.permissions.has('STREAM')) listaAddeds.push('Stream');
    if (oldRole.permissions.has('STREAM') && !newRole.permissions.has('STREAM')) listaRemoveds.push('Stream');

    if (!oldRole.permissions.has('VIEW_CHANNEL') && newRole.permissions.has('VIEW_CHANNEL')) listaAddeds.push('View channel');
    if (oldRole.permissions.has('VIEW_CHANNEL') && !newRole.permissions.has('VIEW_CHANNEL')) listaRemoveds.push('View channel');

    if (!oldRole.permissions.has('SEND_MESSAGES') && newRole.permissions.has('SEND_MESSAGES')) listaAddeds.push('Send messages');
    if (oldRole.permissions.has('SEND_MESSAGES') && !newRole.permissions.has('SEND_MESSAGES')) listaRemoveds.push('Send messages');

    if (!oldRole.permissions.has('SEND_TTS_MESSAGES') && newRole.permissions.has('SEND_TTS_MESSAGES')) listaAddeds.push('Send tts messages');
    if (oldRole.permissions.has('SEND_TTS_MESSAGES') && !newRole.permissions.has('SEND_TTS_MESSAGES')) listaRemoveds.push('Send tts messages');

    if (!oldRole.permissions.has('MANAGE_EMOJIS') && newRole.permissions.has('MANAGE_EMOJIS')) listaAddeds.push('Manage emojis');
    if (oldRole.permissions.has('MANAGE_EMOJIS') && !newRole.permissions.has('MANAGE_EMOJIS')) listaRemoveds.push('Manage emojis');

    if (!oldRole.permissions.has('MANAGE_MESSAGES') && newRole.permissions.has('MANAGE_MESSAGES')) listaAddeds.push('Manage messages');
    if (oldRole.permissions.has('MANAGE_MESSAGES') && !newRole.permissions.has('MANAGE_MESSAGES')) listaRemoveds.push('Manage messages');

    if (!oldRole.permissions.has('EMBED_LINKS') && newRole.permissions.has('EMBED_LINKS')) listaAddeds.push('Embed links');
    if (oldRole.permissions.has('EMBED_LINKS') && !newRole.permissions.has('EMBED_LINKS')) listaRemoveds.push('Embed links');

    if (!oldRole.permissions.has('ATTACH_FILES') && newRole.permissions.has('ATTACH_FILES')) listaAddeds.push('Attach files');
    if (oldRole.permissions.has('ATTACH_FILES') && !newRole.permissions.has('ATTACH_FILES')) listaRemoveds.push('Attach files');

    if (!oldRole.permissions.has('READ_MESSAGE_HISTORY') && newRole.permissions.has('READ_MESSAGE_HISTORY')) listaAddeds.push('Read message history');
    if (oldRole.permissions.has('READ_MESSAGE_HISTORY') && !newRole.permissions.has('READ_MESSAGE_HISTORY')) listaRemoveds.push('Read message history');

    if (!oldRole.permissions.has('MENTION_EVERYONE') && newRole.permissions.has('MENTION_EVERYONE')) listaAddeds.push('Mention everyone');
    if (oldRole.permissions.has('MENTION_EVERYONE') && !newRole.permissions.has('MENTION_EVERYONE')) listaRemoveds.push('Mention everyone');

    if (!oldRole.permissions.has('USE_EXTERNAL_EMOJIS') && newRole.permissions.has('USE_EXTERNAL_EMOJIS')) listaAddeds.push('Use external emojis');
    if (oldRole.permissions.has('USE_EXTERNAL_EMOJIS') && !newRole.permissions.has('USE_EXTERNAL_EMOJIS')) listaRemoveds.push('Use external emojis');

    if (!oldRole.permissions.has('VIEW_GUILD_INSIGHTS') && newRole.permissions.has('VIEW_GUILD_INSIGHTS')) listaAddeds.push('View guild insigths');
    if (oldRole.permissions.has('VIEW_GUILD_INSIGHTS') && !newRole.permissions.has('VIEW_GUILD_INSIGHTS')) listaRemoveds.push('View guild insigths');

    if (!oldRole.permissions.has('CONNECT') && newRole.permissions.has('CONNECT')) listaAddeds.push('Connect');
    if (oldRole.permissions.has('CONNECT') && !newRole.permissions.has('CONNECT')) listaRemoveds.push('Connect');

    if (!oldRole.permissions.has('SPEAK') && newRole.permissions.has('SPEAK')) listaAddeds.push('Speak');
    if (oldRole.permissions.has('SPEAK') && !newRole.permissions.has('SPEAK')) listaRemoveds.push('Speak');

    if (!oldRole.permissions.has('MUTE_MEMBERS') && newRole.permissions.has('MUTE_MEMBERS')) listaAddeds.push('Mute members');
    if (oldRole.permissions.has('MUTE_MEMBERS') && !newRole.permissions.has('MUTE_MEMBERS')) listaRemoveds.push('Mute members');

    if (!oldRole.permissions.has('DEAFEN_MEMBERS') && newRole.permissions.has('DEAFEN_MEMBERS')) listaAddeds.push('Defen members');
    if (oldRole.permissions.has('DEAFEN_MEMBERS') && !newRole.permissions.has('DEAFEN_MEMBERS')) listaRemoveds.push('Defen members');

    if (!oldRole.permissions.has('MOVE_MEMBERS') && newRole.permissions.has('MOVE_MEMBERS')) listaAddeds.push('Move members');
    if (oldRole.permissions.has('MOVE_MEMBERS') && !newRole.permissions.has('MOVE_MEMBERS')) listaRemoveds.push('Move members');

    if (!oldRole.permissions.has('USE_VAD') && newRole.permissions.has('USE_VAD')) listaAddeds.push('Use vad');
    if (oldRole.permissions.has('USE_VAD') && !newRole.permissions.has('USE_VAD')) listaRemoveds.push('Use vad');

    if (!oldRole.permissions.has('CHANGE_NICKNAME') && newRole.permissions.has('CHANGE_NICKNAME')) listaAddeds.push('Change nickname');
    if (oldRole.permissions.has('CHANGE_NICKNAME') && !newRole.permissions.has('CHANGE_NICKNAME')) listaRemoveds.push('Change nickname');

    if (!oldRole.permissions.has('MANAGE_NICKNAMES') && newRole.permissions.has('MANAGE_NICKNAMES')) listaAddeds.push('Manage nicknames');
    if (oldRole.permissions.has('MANAGE_NICKNAMES') && !newRole.permissions.has('MANAGE_NICKNAMES')) listaRemoveds.push('Manage nicknames');

    if (!oldRole.permissions.has('MANAGE_ROLES') && newRole.permissions.has('MANAGE_ROLES')) listaAddeds.push('Manage roles');
    if (oldRole.permissions.has('MANAGE_ROLES') && !newRole.permissions.has('MANAGE_ROLES')) listaRemoveds.push('Manage roles');

    if (!oldRole.permissions.has('MANAGE_WEBHOOKS') && newRole.permissions.has('MANAGE_WEBHOOKS')) listaAddeds.push('Manage webhooks');
    if (oldRole.permissions.has('MANAGE_WEBHOOKS') && !newRole.permissions.has('MANAGE_WEBHOOKS')) listaRemoveds.push('Manage webhooks');
    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {

        if (oldRole.permissions.bitfield === newRole.permissions.bitfield) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Addeds permissions', listaAddeds.join(', '), true)
            .addField('• Removeds permissions', listaRemoveds.join(', '), true)
            .addField('• Role', `${newRole.name}(${newRole.id})`)
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
