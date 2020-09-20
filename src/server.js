const { join, parse } = require('path');
const { capitalize, rModel, getUser, Hora, random } = require('./functions.js')
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const Canvas = require('canvas');
const jimp = require('jimp');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "REACTION"] });
client.color = '#E09E36';
let { color } = client;
const search = require('youtube-search')
const mongoose = require('mongoose');
client.databaseVersion = mongoose.version;
client.database = 'mongoose';
const ms = require("ms")
const tresenraya = require('tresenraya');
const express = require('express');
const mal = '<:ohno:721174460073377804>';
const bien = '<:correcto:721174526930714634>';
const ayuda = 'elsuperduperincreibleseparadordearraysencaminoxdxd:v:vxdxdestonadieloescribiranuncaxdxdhdsbasudkjbsdjnasiudhaskkdhbdjfasdfilshdvfaciludvshfilahsdvfcliuasdbvfcilukjbsdvfiulKJVIUHJIOSDHADUJohifjbdsofihbsfihjbsdfiohbaiaslhabodhb'
const queue = new Map();
const chat = new Map();
const yts = require('yt-search');
const { env } = require('process');
const { EventEmitter } = require('events');
const { baseModelName } = require('./models/chat.js');

(async () => {

    const { readdir } = require("fs").promises;
    const db_files = await readdir(require("path").join(__dirname, "./models/"));
    const available_models = db_files.map(elem => elem.endsWith("js") ? elem.slice(0, -3) : elem);

    client.getData = async ({ ...search }, db, inexistentSave = true) => {
        if (!search || !db) return;
        if (!available_models.includes(db))
            return console.log("[-] (getData) Se esperaba una colección existente, pusiste esta: " + db);

        const db_collection = require(`./models/${db}`);
        const data = await db_collection.findOne(search);
        if (!data && inexistentSave) await client.createData(search, db);

        return data || {};
    }

    client.createData = async (data, db) => {
        if (!data || !db) return;
        if (!available_models.includes(db))
            return console.log("[-] (createData) Se esperaba una colección existente, pusiste esta: " + db);

        const db_collection = require(`./models/${db}`);
        let merged = Object.assign({ _id: mongoose.Types.ObjectId() }, data);

        const newData = new db_collection(merged);
        return newData.save().catch(err => console.log(err));
    }

    client.updateData = async ({ ...search }, { ...settings }, db, saveIfNotExists = true) => {
        if (!search || !settings || !db) return;
        if (!available_models.includes(db))
            return console.log("[-] (updateData) Se esperaba una colección existente, pusiste esta: " + db);

        let data = await client.getData(search, db);
        if (typeof data !== "object") data = {};
        if (!Object.keys(data).length) {
            if (saveIfNotExists)
                return setTimeout(async () => { await client.updateData(search, settings, db) }, 1000);
            else
                return null; /*console.log("[-] (updateData) Si quieres actualizar datos aún así no exista el documento, pon como 4to parámetro en la función: true.");*/
        }

        for (const key in settings) {
            if (settings.hasOwnProperty(key)) {
                if (data[key] !== settings[key]) data[key] = settings[key];
            }
        }
        return await data.updateOne(settings);
    }
})();


function duration(segundos) {
    var s = parseInt(segundos) * 1000
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (`${secs}`.length === 1) {
        secs = `0${secs}`;
    }

    if (`${mins}`.length === 1) {
        mins = `0${mins}`;
    }

    if (hrs <= 0) {
        if (mins <= 0) {
            return 0 + ':' + secs;
        } else {
            return mins + ":" + secs;
        }
    } else {
        return hrs + ":" + mins + ":" + secs;
    }
}

client.on('ready', () => {

    setInterval(() => {

        client.channels.cache.get('755938504470691871').setName(`Guilds: ${client.guilds.cache.size}`);

        client.channels.cache.get('756249790211162123').setName(`Users: ${client.users.cache.size}`);

    }, ms('5m'));

    console.log(`${client.user.tag} está listo!`);
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "z!help",
            type: "WATCHING"
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
        .addField('Base de datos', client.database, true)
        .addField('Version de database', client.databaseVersion, true)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setFooter(client.users.cache.get('507367752391196682').tag, client.users.cache.get('507367752391196682').displayAvatarURL({ format: 'png', size: 2048 }));
    client.users.cache.get('507367752391196682').send({ embed: embed }).catch(err => console.log(err))
    //GitHub
    client.channels.cache.get('723247210531258430')
        .messages
        .fetch(client.channels.cache.get('723247210531258430').lastMessageID)
        .then(m => client.users.cache.get('507367752391196682')
            .send(m.embeds)
        );
});
let cooldown = new Set()
let cooldownG = new Set()
let cooldownniveles = new Set();
client.on('message', async (message) => {
    if (!message.guild) return;
    function errorEmbed(argumentoDeLaDescripcion) {
        return message.channel.send({
            embed: new Discord.MessageEmbed()
                .setDescription(`¡<:ohno:721174460073377804> => \`Error\`: ${argumentoDeLaDescripcion}!`)
                .setColor(color)
                .setTimestamp()
        }).catch(error => { enviarError(error, message.author) });
    }


    function embedResponse(argumentoDeLaDescripcion, opcion) {
        let canal_a_enviar = opcion || message.channel
        return canal_a_enviar.send({
            embed: new Discord.MessageEmbed()
                .setDescription(argumentoDeLaDescripcion)
                .setColor(color)
                .setTimestamp()
        }).catch(error => { enviarError(error, message.author) });
    }
    let prefix = 'z!';
    await client.getData({ id: message.guild.id }, 'prefix').then((data) => {
        prefix = data.prefix || 'z!'
    })

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    function enviarError(elErrorAca, usuario) {
        let embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setDescription(elErrorAca)
            .setFooter(`Comando usado: ${command}`)
            .setColor(color)
        usuario.send({ embed: embed })
            .catch(error => { });
    }

    if (message.author.bot) return;

    let emojiFinded = message.guild.emojis.cache.find(a => a.name === message.content.slice(2)) || client.emojis.cache.find(a => a.name === message.content.slice(2));
    //console.log(emojiFinded)
    if (message.content.slice(0, 2) === ': ' && emojiFinded)
        return message.channel.send(emojiFinded.toString()).catch(e => { enviarError(err, message.author) })

    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
        return embedResponse(`El prefix del servidor es \`${prefix}\``).catch(e => { enviarError(err, message.author) })
    }

    function xd(a) {
        return { bol: a.bol, razon: a.razon }
    }

    let Random = Math.floor(Math.random() * 24) + 1;
    if (!message.content.startsWith(prefix)) {

        if (xd(await client.getData({ id: message.author.id }, 'blacklist')).bol) return;

        let guild = `${message.guild.id}_${message.author.id}`;
        //console.log(cooldownniveles)
        if (cooldownniveles.has(guild)) {
            return;
        }
        else {

            let { xp, nivel } = await client.getData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, 'niveles');


            let levelup = 5 * (nivel ** 2) + 50 * nivel + 100;

            cooldownniveles.add(guild);
            setTimeout(() => {
                cooldownniveles.delete(guild);
            }, ms('30s'));

            if ((xp + Random) > levelup) {

                await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { xp: 0 }, 'niveles');
                await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { $inc: { nivel: 1 } }, 'niveles');
                let { canal } = await client.getData({ id: message.guild.id }, 'logslevel')
                let channel = client.channels.cache.get(canal) || message.channel;
                //if (!channel) channel = message.channel;
                /*
                                let text = encodeURIComponent(`${message.author.tag}, subiste al nivel ${nivel + 1}!`)
                                let link = `https://api.alexflipnote.dev/challenge?text=${text}&icon=2`
                                let embed = new Discord.MessageEmbed()
                                    .setColor(color)
                                    .setImage(link);
                                channel.send({ embed: embed }).catch(a => { });
                
                */
                let usuario = message.author
                const { createCanvas, loadImage, registerFont } = require('canvas');

                registerFont('/app/OpenSansEmoji.ttf', { family: "Open Sans Emoji" })
                registerFont('/app/Minecrafter.Reg.ttf', { family: "Minecraft" })

                const canvas = createCanvas(700, 100);
                const ctx = canvas.getContext('2d');

                const background = await loadImage('https://cdn.discordapp.com/attachments/621139895729258528/747968079191081010/challenge.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

                const avatar = await loadImage(usuario.displayAvatarURL({ format: 'png' }));

                const applyText = (canvas, text) => {
                    const ctx = canvas.getContext('2d');

                    let fontSize = 70;

                    do {

                        ctx.font = `${fontSize -= 1}px "Open Sans Emoji"`;

                    } while (ctx.measureText(text).width > canvas.width - 105);

                    return ctx.font;
                };

                let txt = 'Level up!';
                ctx.fillStyle = "#ea899a";
                ctx.font = '40px "Minecraft"'
                ctx.fillText(txt, 95, 45);


                let text = `${usuario.tag} has subido al nivel ${nivel + 1}!`;
                ctx.font = applyText(canvas, text, 90, 84);
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(text, 95, 80);

                //circulo
                ctx.beginPath();
                ctx.arc(50, 50, 40, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                //circulo

                ctx.drawImage(avatar, 10, 10, 80, 80);

                channel.send(new Discord.MessageAttachment(canvas.toBuffer(), 'levelImage.png')).catch(err => { })

                //embedResponse(`<@${message.author.id}>, subiste al nivel ${nivel + 1}!`, channel).catch(a => { });

            }

            else {
                client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { $inc: { xp: Random } }, 'niveles');
                //console.log(`${ message.author.tag } ganó ${ random }, es nivel: ${ nivel }, xp que tiene: ${ xp } `);
            }
            return; //console.log('no prefix message')
        }
    }


    if (message.content.length < prefix.length + 1) {
        return;
    }
    else {
        if (cooldownG.has(message.author.id)) {
            let embed = new Discord.MessageEmbed()
                .setDescription(`Wow, más despacio velocista!\nEl cooldown de los comandos es de 3s!`)
                .setThumbnail('https://media1.tenor.com/images/dcc0245798b90b4172a06be002620030/tenor.gif?itemid=14757407')
                .setColor(color)
                .setTimestamp()
            message.channel.send({ embed: embed }).catch(err => { });
            return;
        }
        cooldownG.add(message.author.id);
        setTimeout(() => {
            cooldownG.delete(message.author.id);
        }, ms('3s'));

    };
    let kkblacklist = xd(await client.getData({ id: message.author.id }, 'blacklist'))
    if (kkblacklist.bol) return embedResponse('Wow, al parecer te has portado mal...\nRazon: ' + kkblacklist.razon + '\nQuieres usarme?, pues entra [Aqui](https://discord.gg/hbSahh8)');

    let getRank = async (member) => {

        return new Promise((resolve, reject) => {
            rModel('niveles').find({ idGuild: message.guild.id }).sort({ nivel: -1 }).exec(async (err, res) => {

                let results = res.map(a => a.idMember);

                resolve(results.findIndex(a => a === member.user.id) + 1);

            });
        });
    };

    //inicio de help
    const serverQueue = queue.get(message.guild.id)

    if (command === 'help') {
        if (args[0] === 'chat') {
            let embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor(color)
                .setAuthor('Cosas basicas para aprender!')
                .setDescription(`createchat < public | private > num(maximo de usuarios en el chat)\n
                Si es privado tienes que invitar a los usuarios: invitechat user_id token_chat(el token se te dara al crearlo)\n
                Si es público solo diles el token y ellos tienen que hacer setchat token_chat.\n
                Si quieres ponerle un nombre usa: editchat name Nuevo nombre, lo mismo con la descripción(description) o el limite de usuarios(maxusers)`)
            return message.channel.send({ embed: embed })
                .catch(error => { enviarError(error, message.author) });
        }
        //${prefix}voicekick, ${prefix}voicemute, ${prefix}voiceunmute, ${prefix}voicedeaf, ${prefix}voiceundeaf, 
        message.channel.send({
            embed: new Discord.MessageEmbed()
                .setColor(color)
                .addField('Bot', `${prefix}help, ${prefix}suggest, ${prefix}bugreport, ${prefix}invite, ${prefix}creditos, ${prefix}ping`)
                .addField('Utiles', `${prefix}txt, ${prefix}canal/channel, ${prefix}snipe, ${prefix}shortlink`)
                .addField('Moderación', `${prefix}clear, ${prefix}warn, ${prefix}checkwarns, ${prefix}resetwarns, ${prefix}setwarns, ${prefix}findinvites`)
                .addField('Administración', `${prefix}editchannels, ${prefix}setprefix/changeprefix, ${prefix}setlogs/logschannel`)
                .addField('Diversión', `${prefix}challenge, ${prefix}achievement, ${prefix}ship, ${prefix}supreme, ${prefix}didyoumean, ${prefix}captcha, ${prefix}drake, ${prefix}xd`)
                .addField('Música', `${prefix}play/p, ${prefix}queue/q, ${prefix}skip/s, ${prefix}stop, ${prefix}nowplaying/np, ${prefix}volume/v`)
                .addField('Niveles', `${prefix}setchannelxp, ${prefix}setlevel, ${prefix}xp/exp, ${prefix}rank`)
                .addField('Privados', `${prefix}eval, ${prefix}blacklist, ${prefix}checkblacklist, ${prefix}deny, ${prefix}accept`)
                .addField(`Nuevo: Chat`, `${prefix}createchat, ${prefix}chat, ${prefix}deletechat, ${prefix}infochat, ${prefix}setadmin, ${prefix}unsetadmin, ${prefix}banchat, ${prefix}unbanchat, ${prefix}editchat, ${prefix}publiclist, ${prefix}sendchat, ${prefix}userchats, ${prefix}invitechat, ${prefix}setchat, ${prefix}listchats, ${prefix}leavechat`)
                .addField('Among Us', `${prefix}muteall, ${prefix}unmuteall, ${prefix}setmessageid`)
                .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
                .setTimestamp()
                .setFooter('Recomendamos que el bot tenga todos los permisos para que no haya problemas!', client.user.displayAvatarURL({ format: 'png', size: 2048 }))
        }).catch(error => { enviarError(error, message.author) });
    }
    //fin de help

    //inicio de invite
    else if (command === 'invite') {
        let link = 'https://discordapp.com/oauth2/authorize?client_id=721080193678311554&scope=bot&permissions=2146958847';
        let invitacionLink = 'https://discord.gg/hbSahh8';
        let embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
            .setDescription(`Link de invitación del bot => [Link](${link}) \nLink de invitación al servidor de soporte => [Link](${invitacionLink})`)
            .setColor(color)
            .setFooter('Gracias por apoyar!', message.author.displayAvatarURL({ format: 'png', size: 2048 }))
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) });
    }
    //fin de invite

    //!inicio de editchannels
    else if (command === 'editchannels') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return errorEmbed('No tienes el permiso `ADMINISTRATOR`.').catch(error => { enviarError(error, message.author) });
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return errorEmbed('No tienes el permiso `MANAGE_CHANNELS`.').catch(error => { enviarError(error, message.author) });
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return errorEmbed('No tengo el permiso `ADMINISTRATOR`.').catch(error => { enviarError(error, message.author) });
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return errorEmbed('No tengo el permiso `MANAGE_CHANNELS`.').catch(error => { enviarError(error, message.author) });
        if (cooldown.has(message.guild.id)) {
            embedResponse(message.author.username + ", utilice el comando despues de 5 minutos!").catch(error => { enviarError(error, message.author) });
            return;
        }
        let id = message.mentions.roles.first() || message.mentions.users.first()
        if (!id) return embedResponse('Menciona un rol o usuario!\nEjemplo:\n' + prefix + 'editchannels <mencion de rol o user> <true | false | null>').catch(error => { enviarError(error, message.author) });
        id = id.id
        let canales = message.guild.channels.cache.filter(a => a.type === 'text');
        if (canales.size >= 101) return embedResponse('Este servidor tiene más de 100 canales de texto!').catch(error => { enviarError(error, message.author) })
        if (!args[1]) return embedResponse('Ejemplo:\n' + prefix + 'editchannels <mencion de rol o user> <true | false | null>').catch(error => { enviarError(error, message.author) })
        if (!message.guild.roles.cache.get(id) && !message.guild.members.cache.get(id)) return embedResponse('Error en encontrar la ID de usuario/rol').catch(error => { enviarError(error, message.author) });
        if (!['true', 'false', 'null'].includes(args[1])) return embedResponse('Escoge entre true, false, null').catch(error => { enviarError(error, message.author) });
        let bolChose;

        switch (args[1]) {

            case 'true':
                bolChose = true
                break;

            case 'false':
                bolChose = false
                break;

            case 'null':
                bolChose = null
                break;

            default:
                bolChose = 'none';
                break

        }

        if (bolChose === 'none') return embedResponse('Escoge entre true, false, null').catch(error => { enviarError(error, message.author) });

        message.channel.send(`Editando canales...`).catch(error => { enviarError(error, message.author) });
        cooldown.add(message.guild.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 300000); //5 minutos
        canales.forEach(async (ch) => {

            await Discord.Util.delayFor(300)

            await ch.updateOverwrite(id, {
                SEND_MESSAGES: bolChose
            }).catch(error => { });

        });
    }
    //!fin de editchannels

    //inicio bugreport
    else if (command === 'bugreport') {
        if (!args[0]) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) })
        embedResponse(`${message.author.tag} ha reportado el siguente \"bug\":\n${args.join(' ')}`, client.channels.cache.get('725053091522805787')).then(a => {
            embedResponse('Reporte enviado!').catch(error => { enviarError(error, message.author) })
        })
    }

    else if (command === 'shortlink') {
        const shorten = require('isgd');
        if (!args[0]) return embedResponse('Correct use:\n`shortlink <link>').catch(error => { enviarError(error, message.author) });
        if (args[0].includes('discord.gg/')) return embedResponse('You can\'t put a invite in the command!').catch(error => { enviarError(error, message.author) });

        if (args[0]) {
            shorten.shorten(args[0], function (res) {
                embedResponse(`Result:\n${res}`).catch(error => { enviarError(error, message.author) })
            })
        }
    }

    //fin de bugreport

    //inicio de suggest
    else if (command === 'suggest') {
        if (!args[0]) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) })
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .addField(message.author.tag, args.join(' '))
        client.channels.cache.get('727948582556270682').send({ embed: embed })
        embedResponse('Sugerencia enviada!').catch(err => { enviarError(err, message.author) })
    }
    //fin suggest

    //inicio de txt
    else if (command === 'txt') {
        if (!message.channel.permissionsFor(message.author).has('ATTACH_FILES')) return errorEmbed('No tienes el permiso `ATTACH_FILES`').catch(error => { enviarError(error, message.author) });
        if (!message.channel.permissionsFor(message.client.user).has('ATTACH_FILES')) return errorEmbed('No tengo el permiso `ATTACH_FILES`').catch(error => { enviarError(error, message.author) });
        if (!args[0]) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) })
        message.channel.send({
            files: [{
                attachment: Buffer.from(args.join(' ')),
                name: "Text.txt"
            }]
        }).catch(error => { enviarError(error, message.author) })
    }
    //fin de txt

    //inicio de eval
    else if (command === 'eval') {
        if (!["507367752391196682", "374710341868847104"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!').catch(error => { enviarError(error, message.author) })
        let limit = 1950;
        try {
            let code = args.join(" ");
            let evalued = await eval(`(async() => {${code}})()`);
            let asd = typeof (evalued)
            evalued = require("util").inspect(evalued, { depth: 0 });
            let txt = "" + evalued;
            let limit = 1999
            if (txt.length > limit) return message.channel.send('Evaluación mayor a 1999 caracteres!').catch(error => { enviarError(error, message.author) })
            let embed = new Discord.MessageEmbed()
                .setTitle(`Eval`)
                .addField(`Entrada`, `\`\`\`js\n${code}\`\`\``)
                .addField(`Salida`, `\`\`\`js\n${evalued}\n\`\`\``.replace(client.token, "Contenido privado"))
                .addField(`Tipo`, `\`\`\`js\n${asd}\`\`\``.replace("number", "Number").replace("object", "Object").replace("string", "String").replace(undefined, "Undefined").replace("boolean", "Boolean").replace("function", "Function"))
                .setColor(color)
                .setTimestamp()
            message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) })
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``).catch(err => console.log(err)).catch(error => { enviarError(error, message.author) });
        };
    }
    //fin de eval

    //inicio de blacklist
    else if (command === 'blacklist') {
        if (!["507367752391196682", "374710341868847104"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!').catch(error => { enviarError(error, message.author) });
        let razon = args.slice(2).join(' ') || 'No especificada!'
        if (!args[0]) return embedResponse('Escribe la ID de un usuario!').catch(error => { enviarError(error, message.author) });
        if (!client.users.cache.get(args[0])) return embedResponse('No encontre al usuario!').catch(error => { enviarError(error, message.author) });
        if (!['true', 'false'].includes(args[1])) return embedResponse('¿true o false?').catch(error => { enviarError(error, message.author) });
        await client.updateData({ id: args[0] }, { bol: args[1], razon: razon }, 'blacklist');
        embedResponse('Listo!').catch(error => { enviarError(error, message.author) });
    }
    //fin de blacklist

    //inicio de accept
    else if (command === 'accept') {
        if (!["507367752391196682", "374710341868847104"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!').catch(error => { enviarError(error, message.author) });
        if (!args[0]) return embedResponse('Escribe una ID valida').catch(error => { enviarError(error, message.author) });
        if (!args[1]) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) });

        if (await messageS(args[0]) === false) return embedResponse('No he encontrado ese mensaje!').catch(error => { enviarError(error, message.author) });
        else {
            client.channels.cache.get('727948582556270682').messages.fetch(args[0]).then(a => {
                a.edit(a.embeds[0]
                    .addField('Aceptado!', args.slice(1).join(' '))
                    .setColor('GREEN'))
                    .catch(error => { enviarError(error, message.author) });

                a.react('721174526930714634').catch(error => { enviarError(error, message.author) });
            });
            embedResponse('Sugerencia aceptada!').catch(error => { enviarError(error, message.author) });
        }
    }
    //fin de accept

    //inicio de deny
    else if (command === 'deny') {
        if (!["507367752391196682", "374710341868847104"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!').catch(error => { enviarError(error, message.author) });
        if (!args[0]) return embedResponse('Escribe una ID valida').catch(error => { enviarError(error, message.author) });
        if (!args[1]) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) });

        if (await messageS(args[0]) === false) return embedResponse('No he encontrado ese mensaje!').catch(error => { enviarError(error, message.author) });
        else {
            client.channels.cache.get('727948582556270682').messages.fetch(args[0]).then(a => {
                a.edit(a.embeds[0]
                    .addField('Denegado!', args.slice(1).join(' '))
                    .setColor('RED'))
                    .catch(error => { enviarError(error, message.author) });

                a.react('721174460073377804').catch(error => { enviarError(error, message.author) });
            });
            embedResponse('Sugerencia denegada!').catch(error => { enviarError(error, message.author) });
        }
    }
    //fin de deny

    //inicio de checkblacklist
    else if (command === 'checkblacklist') {
        if (!["507367752391196682", "374710341868847104"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!').catch(error => { enviarError(error, message.author) });
        if (!args[0]) return embedResponse('Escribe la ID de un usuario!').catch(error => { enviarError(error, message.author) });
        if (!client.users.cache.get(args[0])) return embedResponse('No encontre al usuario!').catch(error => { enviarError(error, message.author) });
        await client.getData({ id: args[0] }, 'blacklist').then((data) => {
            embedResponse(`${data.bol ? 'Está en la blacklist :c\nRazón: ' + data.razon : 'No está en la blacklist'}`)
                .catch(error => { enviarError(error, message.author) });
        })
    }
    //fin de checkblacklist

    //inicio de ping
    else if (command === 'ping') {
        embedResponse(`Ping: ${client.ws.ping}ms`)
    }
    //fin de ping

    //comienzo de setlogs
    else if (command === 'setlogs' || command === 'logschannel') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed("No tienes el permiso `ADMINISTRATOR`").catch(error => { enviarError(error, message.author) })
        let channel = message.mentions.channels.first();
        if (!channel) return embedResponse("No has mencionado un canal/Ese canal no existe.").catch(error => { enviarError(error, message.author) })
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(channel.id)) return embedResponse('El canal tiene que ser del Servidor donde estas!').catch(error => { enviarError(error, message.author) })

        await client.updateData({ id: message.guild.id }, { channellogs: channel.id }, 'logs')

        return embedResponse(`Canal establecido en: <#${channel.id}>`).catch(error => { enviarError(error, message.author) })
    }
    //fin de setlogs

    //inicio de setprefix
    else if (command === 'setprefix' || command === 'changeprefix') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed("No tienes el permiso `ADMINISTRATOR`").catch(error => { enviarError(error, message.author) })
        if (!args[0] || args[0].length >= 4) return embedResponse('El prefix debe tener menos de 3 caracteres!').catch(error => { enviarError(error, message.author) });

        await client.updateData({ id: message.guild.id }, { prefix: args[0] }, 'prefix').catch(e => { });

        return embedResponse(`Prefix establecido a \`${args[0]}\``).catch(error => { enviarError(error, message.author) })
    }
    //fin de setprefix

    //inicio de canal
    else if (command === 'canal' || command === 'channel') {
        let { canal } = await client.getData({ id: message.guild.id }, 'logslevel');
        let { channellogs } = await client.getData({ id: message.guild.id }, 'logs');
        let canal1
        let canal2;
        if (!canal || canal.length < 5) {
            canal1 = 'No establecido!';
        }
        else {
            canal1 = canal || !canal.length <= 1 ? `<#${canal}>(${canal})` : 'No establecido!';
        }
        if (!channellogs || channellogs.length < 5) {
            canal2 = 'No establecido!';
        }
        else {
            canal2 = channellogs || !channellogs.length <= 1 ? `<#${channellogs}>(${channellogs})` : 'No establecido!';
        }
        if (!message.guild.channels.cache.filter(a => a.type === 'text').map(a => a.id).includes(channellogs)) {
            canal2 = 'Canal no encontrado!'
        }

        if (!message.guild.channels.cache.filter(a => a.type === 'text').map(a => a.id).includes(canal)) {
            canal1 = 'Canal no encontrado!'
        }

        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .addField('Canal XP', canal1)
            .addField('Canal de logs', canal2)

        message.channel.send({ embed: embed });
    }
    //fin de canal

    //inicio de snipe
    else if (command === 'snipe') {

        let canal = message.mentions.channels.first() || message.channel;

        await client.getData({ id: canal.id }, 'snipe').then((data) => {


            if (!data || !data.snipe || data.snipe.length === 0) return embedResponse("Nada en la base de datos").catch(error => { enviarError(error, message.author) });
            else {
                let la_data = data.snipe
                let separador = la_data.split(ayuda)
                if (!separador[1]) return embedResponse("Nada en la base de datos").catch(error => { enviarError(error, message.author) });
                let embed = new Discord.MessageEmbed()
                    .addField('Mensaje', separador[0])
                    .addField('Autor', separador[1].slice(0, 1024))
                    .setColor(color)
                    .setTimestamp()
                    .setTitle('Snipe')
                    .setThumbnail('https://media1.tenor.com/images/8c3e8a0a3c7b0afc22624c9278be6a89/tenor.gif?itemid=5489827')
                return message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) });
            }
        });
    }
    //fin de snipe

    //inicio de clear
    else if (command === 'clear') {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return errorEmbed('No tienes el permiso `MANAGE_MESSAGES`!').catch(error => { enviarError(error, message.author) });
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return errorEmbed('No tengo el permiso `MANAGE_MESSAGES`').catch(error => { enviarError(error, message.author) });
        if (!args[0]) return embedResponse('Escribe un numero!').catch(error => { enviarError(error, message.author) });
        if (isNaN(args[0])) return embedResponse('' + mal + ' Escribe un numero!').catch(error => { enviarError(error, message.author) })
        if (args[0] >= 100 || args[0] === 0) return embedResponse('Un numero del 1 al 99').catch(error => { enviarError(error, message.author) });
        await message.delete().catch(error => { enviarError(error, message.author) });
        await message.channel.bulkDelete(args[0], true).then(d => {
            if (d.size < args[0]) return d.size === 0 ? errorEmbed('Ningun mensaje fue eliminado!').catch(error => { enviarError(error, message.author) }) : embedResponse('Mensajes eliminados: ' + d.size)
                .catch(error => { enviarError(error, message.author) })
            else return embedResponse('Mensajes eliminados: ' + d.size)
                .catch(err => { enviarError(error, message.author) })
        }).catch(error => { enviarError(error, message.author) });

    }
    //fin de clear

    //inicio de challenge
    else if (command === 'challenge') {
        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/challenge?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) })
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) })
    }
    //fin de challenge

    //inicio de achievement
    else if (command === 'achievement') {
        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/achievement?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) })
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) })
    }
    //fin de achievement

    //inicio de supreme
    else if (command === 'supreme') {
        let argumento = args.join(' ');
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/supreme?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) })
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) })
    }
    //fin de supreme

    //inicio de captcha
    else if (command === 'captcha') {
        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/captcha?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) })
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) })
    }
    //fin de captcha

    //inicio de didyoumean
    else if (command === 'didyoumean') {
        let argumento = args.join(' ').split(' ,|, ')
        let txt = encodeURIComponent(argumento[0]);
        let texto = encodeURIComponent(argumento[1])
        let link = `https://api.alexflipnote.dev/didyoumean?top=${txt}&bottom=${texto}`;
        if (!argumento[1]) return embedResponse('Ejemplo de uso:\n```js\n' + prefix + 'didyoumean Hola ,|, Adios```').catch(error => { enviarError(error, message.author) });
        if (txt.length >= 45) return embedResponse('El primer argumento debe tener menos de `45`').catch(error => { enviarError(error, message.author) });
        if (texto.length >= 40) return embedResponse('El segundo argumento debe tener menos de `40`').catch(error => { enviarError(error, message.author) });
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) });
    }

    //fin de didyoumean

    //inicio de drake
    else if (command === 'drake') {
        let argumento = args.join(' ').split(' ,|, ')
        let txt = encodeURIComponent(argumento[0]);
        let texto = encodeURIComponent(argumento[1])
        let link = `https://api.alexflipnote.dev/drake?top=${txt}&bottom=${texto}`;
        if (!argumento[1]) return embedResponse('Ejemplo de uso:\n```js\n' + prefix + 'drake Hola ,|, Adios```').catch(error => { enviarError(error, message.author) });
        if (txt.length >= 60) return embedResponse('El primer argumento debe tener menos de `60`').catch(error => { enviarError(error, message.author) });
        if (texto.length >= 60) return embedResponse('El segundo argumento debe tener menos de `60`').catch(error => { enviarError(error, message.author) });
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setTimestamp()
            .setColor(color)
        message.channel.send({ embed: embed }).catch(error => { enviarError(error, message.author) });
    }

    //fin de drake

    //inicio de ship
    else if (command === 'ship') {
        let mencionado = message.mentions.users.first()
        if (!mencionado) return embedResponse('Menciona a alguien!').catch(error => { enviarError(error, message.author) });
        message.channel.send(
            new Discord.MessageEmbed()
                .setTimestamp()
                .setImage(`https://api.alexflipnote.dev/ship?user=${message.author.displayAvatarURL({ format: 'png', size: 2048 })}&user2=${mencionado.displayAvatarURL({ format: 'png', size: 2048 })}`)
                .setColor(color)
                .setDescription(`Hmm, creo que se quieren un ${Math.floor(Math.random() * 99) + 1}%\n\n¿Eso es amor?`)
        ).catch(error => { enviarError(error, message.author) });
    }
    //fin de ship

    //inicio de musica

    //inicio de play
    else if (command === 'play' || command === 'p') {
        if (!message.member.voice.channel) return embedResponse('Necesitas estar en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!message.member.voice.channel.permissionsFor(message.client.user).has('CONNECT')) return embedResponse('No puedo unirme a ese canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!message.member.voice.channel.permissionsFor(message.client.user).has('SPEAK')) return embedResponse('No puedo hablar en ese canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!args[0]) return embedResponse('Escribe algo!').catch(error => { enviarError(error, message.author) });
        /*const opts = {
            maxResults: 1, 
            key: process.env.YOUTUBEKEY,      
            type: 'video'
        };*/
        //let { items } = await ytsr(args.join(' '));

        const opts = {
            maxResults: 1,
            key: process.env.APIKEY,
            type: "video"
        };

        let result = await new Promise(async (resolve, reject) => {
            await search(args.join(' '), opts, function (err, results) {
                resolve(results[0]);
            });
        });

        const songURL = result.link;
        let songInfo;
        try {
            songInfo = await ytdl.getInfo(songURL);
        } catch (e) { embedResponse(e).catch(err => { enviarError(err, message.author) }) }
        if (!result || !songInfo) return embedResponse('Ups, no he encontrado esa música, intenta de nuevo!').catch(error => { enviarError(error, message.author) });

        let song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            time: duration(songInfo.videoDetails.lengthSeconds),
            author: message.author,
            tiempo: parseInt(songInfo.videoDetails.lengthSeconds)
        }
        if (!serverQueue) {
            const queueObject = {
                textChannel: message.channel,
                voiceChannel: message.member.voice.channel,
                connection: null,
                songs: [],
                volume: 5
            }
            queue.set(message.guild.id, queueObject)
            queueObject.songs.push(song)

            try {
                let connection = await message.member.voice.channel.join()
                queueObject.connection = connection;
                play(message.guild, queueObject.songs[0])
            } catch (err) {
                queue.delete(message.guild.id)
                return message.channel.send('Error: ' + err).catch(error => { enviarError(error, message.author) });
            }
            embedResponse(`Reproduciendo: [${song.title}](${song.url}) - ${song.time} - ${song.author.toString()}`).catch(error => { enviarError(error, message.author) });
        }

        else {
            if (serverQueue.songs.length === 0 || !message.guild.me.voice.channel) {
                embedResponse('Reiniciando la cola!\nIntente de nuevo!').catch(error => { enviarError(error, message.author) });
                return queue.delete(message.guild.id)
            } else {
                if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para agregar una canción!').catch(error => { enviarError(error, message.author) });
                serverQueue.songs.push(song)
                embedResponse(`Añadiendo a la cola: [${song.title}](${song.url}) - ${song.time} - ${song.author.toString()}`).catch(error => { enviarError(error, message.author) });
            }
        }
    }
    //fin de play

    //inicio de queue
    else if (command === 'queue' || command === 'q') {
        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para saber la lista!').catch(error => { enviarError(error, message.author) });
        let x = serverQueue.songs.map(a => a.tiempo).reduce((a, b) => a + b);

        let cancionesSeparadas = [];

        function seleccion() {
            let arg = args[0] || 1;
            if (arg < 0) return 1;
            else {
                return parseInt(arg) || 1;
            }
        }
        let s;

        for (let i = 0; i < serverQueue.songs.length; i += 10) {
            cancionesSeparadas.push(serverQueue.songs.slice(i, i + 10));
        }

        if (!cancionesSeparadas[seleccion() - 1]) {
            let embed1 = new Discord.MessageEmbed()
                .setColor(color)
                .setTimestamp()
                .setDescription('Pagina inexistente!')
                .setFooter(`Pagina actual: ${seleccion()}`)
            s = embed1
        } else {

            let embed2 = new Discord.MessageEmbed()
                .setColor(color)
                .setTimestamp()
                .setDescription(`
        Canciones en cola:

        ${cancionesSeparadas[seleccion() - 1].map((a, num) => `#${num + 1} [${a.title}](${a.url}) - ${a.time} - ${a.author.toString()}`).join('\n')}

    Total de canciones: ${serverQueue.songs.length} | Tiempo total: ${duration(x)} | Pagina ${seleccion()} / ${cancionesSeparadas.length}
    `, { split: true })
            s = embed2
        }
        message.channel.send({ embed: s }).catch(error => { enviarError(error, message.author) });
    }
    //fin de queue

    //inicio de skip
    else if (command === 'skip' || command === 's') {
        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        if (serverQueue.songs.length <= 1) return embedResponse('Nada que saltar por aca!').catch(error => { enviarError(error, message.author) });
        else {
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para saltar la canción!').catch(error => { enviarError(error, message.author) });
            serverQueue.connection.dispatcher.end()
            return embedResponse('Saltando a la siguiente música!').catch(error => { enviarError(error, message.author) });
        }
    }
    //fin de skip

    //inicio de stop
    else if (command === 'stop') {
        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        else {
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para detener la lista!').catch(error => { enviarError(error, message.author) });
            queue.delete(message.guild.id)
            message.guild.me.voice.channel.leave()
            embedResponse('Cola de reproducción detenida')
        }
    }
    //fin de stop

    //inicio de np
    else if (command === 'np' || command === 'nowplaying') {
        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        else {
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para saber la canción que se esta reproduciendo!').catch(error => { enviarError(error, message.author) });

            let embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTimestamp()
                .setAuthor(`Reproduciendo ahora:`)
                .setThumbnail('https://media.tenor.com/images/84a791e6d9f96e3d203efc9041ba379d/tenor.gif')
                .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) - ${serverQueue.songs[0].author.toString()}`)
                .setFooter(`${duration(Math.trunc(serverQueue.connection.dispatcher.streamTime / 1000))} / ${serverQueue.songs[0].time}`)
            return message.channel.send({ embed: embed })
                .catch(error => { enviarError(error, message.author) });
        };
    }
    //fin de np

    //inicio de volume

    else if (command === 'volume' || command === 'v') {
        if (!message.member.voice.channel) return embedResponse('Tienes que estar en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!message.guild.me.voice.channel) return embedResponse('Wow, creo que no estoy en un canal de voz!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        if (!serverQueue.songs[0]) return embedResponse('Al parecer no hay ninguna canción reproduciendose!').catch(error => { enviarError(error, message.author) });
        else {
            if (isNaN(args.join(' '))) return embedResponse('Pon un numero valido!').catch(error => { enviarError(error, message.author) });
            if (parseInt(args.join(' ')) > 100 || args.join(' ') < 1) return embedResponse('Elije un numero del 1 al 100').catch(error => { enviarError(error, message.author) });
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return embedResponse('Tienes que estar en el mismo canal de voz para cambiar el volumen!').catch(error => { enviarError(error, message.author) });

            serverQueue.volume = Math.floor(parseInt(args.join(' ')));
            serverQueue.connection.dispatcher.setVolumeLogarithmic(Math.floor(parseInt(args.join(' '))) / 5);
            embedResponse(`Cambiado a: ${Math.floor(parseInt(args.join(' ')))}% `).catch(error => { enviarError(error, message.author) });
        }
    }
    //fin de volume

    //inicio de warn

    else if (command === 'warn') {
        if (!message.member.hasPermission('KICK_MEMBERS')) return errorEmbed('No tienes el permiso `KICK_MEMBERS`')
            .catch(error => { enviarError(error, message.author) });
        let miembro = message.mentions.members.first();
        let razon = args.slice(1).join(' ') || 'No especificada';
        if (!miembro) return embedResponse('Menciona a un miembro del servidor!')
            .catch(error => { enviarError(error, message.author) });

        if (!args[0].match(/\<\@(\!)?[0-9]{18}\>/g)) return embedResponse('La mencion tiene que ser el primer argumento!')
            .catch(error => { enviarError(error, message.author) });

        await client.updateData({ id: `${message.guild.id} _${miembro.id} ` }, { $inc: { warns: 1 } }, 'warns');

        await client.updateData({ id: `${message.guild.id} _${miembro.id} ` }, { razon: razon }, 'warns');

        await client.getData({ id: `${message.guild.id} _${miembro.id} ` }, 'warns').then((data) => {
            embedResponse(`El miembro fue advertido!\nAhora tiene: ${data.warns === 0 ? 1 : data.warns} advertencias.\n\nRazón: ${razon}.`)
                .catch(error => { enviarError(error, message.author) });
        });

    }

    //fin de warn

    //inicio de setwarns

    else if (command === 'setwarns') {
        if (!message.member.hasPermission('KICK_MEMBERS')) return errorEmbed('No tienes el permiso `KICK_MEMBERS`')
            .catch(error => { enviarError(error, message.author) });

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Menciona a un miembro del servidor!')
            .catch(error => { enviarError(error, message.author) });

        if (!args[0].match(/\<\@(\!)?[0-9]{18}\>/g)) return embedResponse('La mencion tiene que ser el primer argumento!')
            .catch(error => { enviarError(error, message.author) });

        if (isNaN(args[1])) return embedResponse('El segundo argumento tiene que ser un numero!')
            .catch(error => { enviarError(error, message.author) });

        if (parseInt(args[1]) < 0) return embedResponse('El segundo argumento debe ser igual o mayor a cero!')
            .catch(error => { enviarError(error, message.author) });

        await client.updateData({ id: `${message.guild.id} _${miembro.id} ` }, { warns: parseInt(args[1]) }, 'warns');

        embedResponse(`Ahora el miembro ${miembro.user.username} tiene ${args[1]} advertencias!`)
            .catch(error => { enviarError(error, message.author) });


    }

    //fin de setwarns

    //inicio de checkwarns

    else if (command === 'checkwarns') {
        if (!message.mentions.members.first()) return embedResponse('Menciona a un miembro del servidor!')
            .catch(error => { enviarError(error, message.author) });

        client.getData({ id: `${message.guild.id} _${message.mentions.users.first().id} ` }, 'warns')
            .then((data) => {
                embedResponse(`Tiene ${!data.warns ? 0 : data.warns} advertencias\n\nUltima razón: ${!data.razon ? 'No especificada!' : data.razon} `)
                    .catch(error => { enviarError(error, message.author) });
            })
    }

    //fin de checkwarns

    //inicio de findinvites
    else if (command === 'findinvites') {


        let x = message.guild.members.cache
            .filter(x => x.presence.activities[0])
            .filter(x => x.presence.activities[0].type === 'CUSTOM_STATUS')
            .filter(x => x.presence.activities[0].state)
            .filter(x => x.presence.activities[0].state.includes('discord.gg/'))
            .map(a => `${a.user.toString()} (${a.user.id})`);

        let paginas = funcionPagina(x, 10);

        /*for (let i = 0; i < x.length; i += 10) {
            paginas.push(x.slice(i, i + 10));
        }*/


        if (!message.guild.me.hasPermission('MANAGE_MESSAGES') || !message.channel.permissionsFor(message.client.user).has('MANAGE_MESSAGES'))
            return embedResponse('No tengo el permiso `MANAGE_MESSAGES`!').catch(error => { enviarError(error, message.author) });

        if (!paginas[0]) return embedResponse('No encontre ningun usuario con invitación!')
            .catch(error => { enviarError(error, message.author) });

        let posicion = -1;

        let inicio = new Discord.MessageEmbed()
            .setDescription('Listo, puedes comenzar a reaccionar!')
            .setColor(color)
            .setTimestamp();

        let m = await message.channel.send({ embed: inicio }).catch(error => { enviarError(error, message.author) });

        await m.react("⏪").catch(error => { enviarError(error, message.author) });
        await m.react("⏩").catch(error => { enviarError(error, message.author) });;

        m.awaitReactions((reaction, user) => {
            if (user.bot) return;
            if (message.author.id !== user.id) {
                reaction.users.remove(user.id).catch(error => { enviarError(error, message.author) });
                return false;
            }

            if (reaction.emoji.name === "⏪" && paginas[posicion - 1]) {
                m.edit(new Discord.MessageEmbed().setDescription(paginas[posicion - 1].join('\n')).setColor(color).setTimestamp()).catch(error => { enviarError(error, message.author) });
                //console.log(paginas)
                posicion--
            }

            if (reaction.emoji.name === "⏩" && paginas[posicion + 1]) {
                m.edit(new Discord.MessageEmbed().setDescription(paginas[posicion + 1].join('\n')).setColor(color).setTimestamp()).catch(error => { enviarError(error, message.author) });
                //console.log(paginas)
                posicion++
            }

            reaction.users.remove(user).catch(error => { enviarError(error, message.author) });
            return true
        }, { max: 30000, time: 200000 }).then(c => {

            m.delete().catch(e => {
                embedResponse("Terminado!").catch(error => { enviarError(error, message.author) });
            })

        })
    }
    /*else if (command === 'findinvites') {
        let paginas = []
        let x = message.guild.members.cache.filter(x => x.presence.activities[0])
            .filter(x => x.presence.activities[0].type === 'CUSTOM_STATUS')
            .filter(x => x.presence.activities[0].state)
            .filter(x => x.presence.activities[0].state.includes('discord.gg/'))
            .map(a => `${a.user.toString()} (${a.user.id})`);
    
    
        for (let i = 0; i < x.length; i += 10) {
            paginas.push(x.slice(i, i + 10));
        }
    
    
        if (!x[0]) return embedResponse('No encontre ningun usuario con invitación!')
            .catch(error => { enviarError(error, message.author) });
        else {
            embedResponse(x.join('\n').slice(0, 1999))
                .catch(error => { enviarError(error, message.author) });
        }
    }*/
    //fin de findinvites
    //inicio de resetwarns

    else if (command === 'resetwarns') {

        if (!message.member.hasPermission('KICK_MEMBERS')) return errorEmbed('No tienes el permiso `KICK_MEMBERS`')
            .catch(error => { enviarError(error, message.author) });

        if (!message.mentions.members.first()) return embedResponse('Menciona a un miembro del servidor!')
            .catch(error => { enviarError(error, message.author) });

        client.updateData({ id: `${message.guild.id} _${message.mentions.users.first().id} ` }, { warns: 0, razon: 'No especificada!' }, 'warns')

        embedResponse(`Advertencias reseteadas!`)
            .catch(error => { enviarError(error, message.author) });

    }

    //fin de resetwarns

    else if (command === 'stopchat') {

    }

    //inicio de xp
    else if (command === 'xp' || command === 'exp') {
        let member = message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member
        let { nivel, xp } = await client.getData({ idGuild: `${message.guild.id}`, idMember: `${member.user.id}` }, 'niveles');
        let levelup = 5 * (nivel ** 2) + 50 * nivel + 100;
        //console.log(xp, nivel);
        let embed = new Discord.MessageEmbed()
            .setDescription(`Nivel: ${nivel ? nivel : 0} \nXp: ${xp ? xp : 0}/${levelup ? levelup : '100'}\nRank: ${await getRank(member) === null ? 'Sin resultados' : await getRank(member)}`)
            .setColor(color)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send({ embed: embed })
            .catch(error => { enviarError(error, message.author) });

    }
    //fin de xp

    //inicio de rank
    else if (command === 'rank') {

        let seleccion = parseInt(args[0]) || 1;

        await require('./models/niveles.js').find({ idGuild: message.guild.id }).limit(150).sort({ nivel: -1 }).exec(async (err, res) => {
            if (err) return console.log(err);
            if (res.length === 0) return embedResponse("No hay datos...").catch(err => { enviarError(err, message.author) });

            let pagina = res.slice(10 * (seleccion - 1), 10 * seleccion);

            let embed = new Discord.MessageEmbed()
                .setDescription(
                    pagina.map((v, i) =>

                        `${(i + 1) + 10 * (seleccion <= 0 ? 1 : seleccion - 1)} | ${!client.users.cache.get(v.idMember) ? 'Miembro desconocido!' : client.users.cache.get(v.idMember).tag} - ${!v.nivel ? 0 : v.nivel}`

                    ).join('\n') || 'Pagina inexistente!'
                )
                .setTimestamp()
                .setFooter(`Pagina actual: ${seleccion <= 0 ? 1 : seleccion}`)
                .setColor(color)

            message.channel.send({ embed: embed }).catch(err => { enviarError(err, message.author) });

        });

    }
    //fin de rank

    //incio de setlevel

    else if (command === 'setlevel') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return errorEmbed('No tienes el permiso `ADMINISTRATOR`')
            .catch(error => { enviarError(error, message.author) });

        let miembro = message.mentions.members.first();
        //let razon = args.slice(1).join(' ') || 'No especificada';
        if (!miembro) return embedResponse('Menciona a un miembro del servidor!')
            .catch(error => { enviarError(error, message.author) });

        if (!args[0].match(/\<\@(\!)?[0-9]{18}\>/g)) return embedResponse('La mencion tiene que ser el primer argumento!')
            .catch(error => { enviarError(error, message.author) });

        if (isNaN(args[1])) return embedResponse('El segundo argumento tiene que ser un numero!')
            .catch(error => { enviarError(error, message.author) });

        if (parseInt(args[1]) < 0) return embedResponse('El segundo argumento debe ser igual o mayor a 0!')
            .catch(error => { enviarError(error, message.author) });

        if (parseInt(args[1]) > 500) return embedResponse('El segundo argumento debe ser igual o menor a 500!')
            .catch(error => { enviarError(error, message.author) });

        await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${miembro.user.id}` }, { nivel: parseInt(args[1]) }, 'niveles');

        //await client.getData({ id: `${message.guild.id}.${miembro.id}` }, 'warns').then((data) => {
        embedResponse(`Ahora el miembro ${miembro.user.username} es nivel ${args[1]}!`)
            .catch(error => { enviarError(error, message.author) });
        //});


    }

    //fin de setlevel

    //inicio de setchannelxp
    else if (command === 'setchannelxp') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed("No tienes el permiso `ADMINISTRATOR`").catch(error => { enviarError(error, message.author) })
        let channel = message.mentions.channels.first();
        if (!channel) return embedResponse("No has mencionado un canal/Ese canal no existe.").catch(error => { enviarError(error, message.author) })
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(channel.id)) return embedResponse('El canal tiene que ser del Servidor donde estas!').catch(error => { enviarError(error, message.author) });
        await client.updateData({ id: message.guild.id }, { canal: channel.id }, 'logslevel')
        return embedResponse(`Canal establecido en: <#${channel.id}>`).catch(error => { enviarError(error, message.author) })
    }
    //fin de setchannelxp

    //inicio de gchat
    else if (command === 'chat') {


        let embed = new Discord.MessageEmbed()
            .setAuthor('No hay nada aq... Oh, mira a wumpus!')
            .setImage('https://i.imgur.com/YCORRwg.png')
            .setColor(color)
            .setFooter('Usa <prefix>setchat token_chat para ver un chat existente!')
            .setTimestamp()

        let { tokenChat } = await client.getData({ id: message.author.id }, 'usuario');
        if (!tokenChat || tokenChat == 'none') return message.channel.send({ embed: embed })
            .catch(error => { enviarError(error, message.author) })

        else {
            let check = await rModel('chat').findOne({ token: tokenChat });
            if (!check)
                return embedResponse('El token establecido no existe!')
                    .catch(error => { enviarError(error, message.author) })

            let { chat, bans } = await client.getData({ token: tokenChat }, 'chat');


            if (bans && bans.includes(message.author.id)) {
                await client.updateData({ id: message.author.id }, { tokenChat: 'none' }, 'usuario');

                return message.channel.send({ embed: embed.setFooter('Oh oh, parece que estas baneado del chat!') })
                    .catch(error => { enviarError(error, message.author) })
            }

            if (!chat || chat == 0) return message.channel.send({ embed: embed.setFooter('El chat está vacio, se el primero en hablar!') })
                .catch(error => { enviarError(error, message.author) })

            let embed1 = new Discord.MessageEmbed()
                .setColor(color)
                .setTimestamp()
                .setDescription(`\`\`\`ini\n${chat.reverse().slice(0, 10).reverse().join('\n')}\`\`\``)
                .setFooter(`Token actual: ${tokenChat}`)

            return message.channel.send({ embed: embed1 })
                .catch(error => { enviarError(error, message.author) });
        }



    }

    else if (command === 'createchat') {

        let max = parseInt(args[1])

        if (!args[0] || !['public', 'private'].includes(args[0].toLowerCase()))
            return embedResponse('Selecciona entre `private` o `public`.\nEjemplo de uso: <prefix>createchat private 15')
                .catch(error => { enviarError(error, message.author) })

        if (!max || max < 2)
            return embedResponse('Pon un numero mayor a 1!')
                .catch(error => { enviarError(error, message.author) });

        if (!max || max > 51)
            return embedResponse('Pon un numero menor a 51!')
                .catch(error => { enviarError(error, message.author) });

        let { grupos } = await client.getData({ id: message.author.id }, 'usuario');
        if (grupos) {
            if (grupos.length >= 10)
                return embedResponse('Has superado el limite de grupos, si quieres borra uno y crea otro!')
                    .catch(error => { enviarError(error, message.author) })
        }
        let tok = Date.now();

        let res;
        let check = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

        if (message.author.tag.match(check) || message.content.includes('`')) {
            res = `[EspecialUser#${message.author.discriminator}]`;
        }
        else {
            res = `[${message.author.tag}]`;
        }

        await client.createData({ token: `${tok}`, owner: message.author.id, }, 'chat');

        await client.updateData({ token: `${tok}` }, { $addToSet: { admins: message.author.id } }, 'chat');

        await client.updateData({ token: `${tok}` }, { $addToSet: { users: message.author.id } }, 'chat');

        await client.updateData({ token: `${tok}` }, { $addToSet: { joinable: message.author.id } }, 'chat');

        await client.updateData({ token: `${tok}` }, { type: args[0].trim() }, 'chat');

        await client.updateData({ token: `${tok}` }, { max: parseInt(args[1]) }, 'chat');

        await client.updateData({ token: `${tok}` }, { chat: `[LOGS]${res} ha creado el chat!` }, 'chat');

        await client.updateData({ id: message.author.id }, { $addToSet: { grupos: `${tok}` } }, 'usuario');

        await embedResponse(`Token: ${tok}`)
            .catch(error => { enviarError(error, message.author) })



    }

    else if (command === 'deletechat') {

        if (!args[0])
            return embedResponse('Ejemplo de uso: <prefix>deletechat token_chat')
                .catch(error => { enviarError(error, message.author) })

        let checkM = await rModel('chat').findOne({ token: args[0] });

        if (!checkM)
            return embedResponse('Token inexistente!')
                .catch(error => { enviarError(error, message.author) })

        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (owner !== message.author.id)
            return embedResponse('No puedes borrar este chat, solo el creador puede!')
                .catch(error => { enviarError(error, message.author) })

        embedResponse('Chat borrado!').catch(error => { enviarError(error, message.author) })
        await deleteChatByToken(args[0]);
    }

    else if (command === 'infochat') {

        if (!args[0])
            return embedResponse('Ejemplo de uso: <prefix>infochat token_chat')
                .catch(error => { enviarError(error, message.author) })

        let checkM = await rModel('chat').findOne({ token: args[0] });

        if (!checkM)
            return embedResponse('Token inexistente!')
                .catch(error => { enviarError(error, message.author) })

        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .addField('Type', type, true)
            .addField('Bans(num)', bans.length, true)
            .addField('Joinable(num)', joinable.length, true)
            .addField('Admins(num)', admins.length, true)
            .addField('Owner', `<@${owner}>`, true)
            .addField(`Users(num)`, users.length, true)
            .addField(`Max(num)`, max, true)
            .addField(`Token`, token, true)
            .addField(`Name`, name, true)
            .addField(`Description`, description, true)
        message.channel.send({ embed: embed })
            .catch(error => { enviarError(error, message.author) })

    }

    else if (command === 'setadmin') {

        if (!args[0] || !args[1])
            return embedResponse('Ejemplo de uso: <prefix>setadmin user_id token_chat')
                .catch(error => { enviarError(error, message.author) })

        let user = client.users.cache.get(args[0]);

        if (!user)
            return embedResponse('No he encontrado ese usuario!')
                .catch(error => { enviarError(error, message.author) })

        let checkM = await rModel('chat').findOne({ token: args[1] });

        if (!checkM)
            return embedResponse('Token inexistente!')
                .catch(error => { enviarError(error, message.author) })

        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (owner !== message.author.id)
            return embedResponse('Solo el creador del chat puede agregar un admin!')
                .catch(error => { enviarError(error, message.author) })

        if (admins.includes(args[0]))
            return embedResponse(`El usuario ya era administrador!`)
                .catch(error => { enviarError(error, message.author) })

        await client.updateData({ token: args[1] }, { $addToSet: { admins: `${args[0]}` } }, 'chat')

        embedResponse(`Has añadido a ${user.tag} como administrador del chat!`)
            .catch(error => { enviarError(error, message.author) })


    }

    else if (command === 'unsetadmin') {

        if (!args[0] || !args[1])
            return embedResponse('Ejemplo de uso: <prefix>unsetadmin user_id token_chat')
                .catch(error => { enviarError(error, message.author) });

        let user = client.users.cache.get(args[0]);

        if (!user)
            return embedResponse('No he encontrado ese usuario!')
                .catch(error => { enviarError(error, message.author) });

        let checkM = await rModel('chat').findOne({ token: args[1] });

        if (!checkM)
            return embedResponse('Token inexistente!')
                .catch(error => { enviarError(error, message.author) });

        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (owner !== message.author.id)
            return embedResponse('Solo el creador del chat puede eliminar un admin!')
                .catch(error => { enviarError(error, message.author) });

        if (!admins.includes(args[0]))
            return embedResponse(`El usuario no era administrador!`)
                .catch(error => { enviarError(error, message.author) });

        if (args[0] == owner)
            return embedResponse('No te puedes eliminar como admin!')
                .catch(error => { enviarError(error, message.author) });

        await client.updateData({ token: args[1] }, { $pull: { admins: `${args[0]}` } }, 'chat')

        embedResponse(`Has eliminado a ${user.tag} como administrador del chat!`)
            .catch(error => { enviarError(error, message.author) });


    }

    else if (command === 'banchat') {

        if (!args[0] || !args[1])
            return embedResponse('Ejemplo de uso: <prefix>banchat user_id token_chat')
                .catch(error => { enviarError(error, message.author) })

        let user = client.users.cache.get(args[0]);

        if (!user)
            return embedResponse('No he encontrado ese usuario!')
                .catch(error => { enviarError(error, message.author) })

        let checkM = await rModel('chat').findOne({ token: args[1] });

        if (!checkM)
            return embedResponse('Token inexistente!')
                .catch(error => { enviarError(error, message.author) })

        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (!admins.includes(message.author.id))
            return embedResponse('Solos los admins pueden banear!')
                .catch(error => { enviarError(error, message.author) })

        if (admins.includes(args[0])) {
            if (owner !== message.author.id)
                return embedResponse(`El usuario es administrador!`)
                    .catch(error => { enviarError(error, message.author) })
        }

        if (args[0] == owner || args[0] == message.author.id)
            return embedResponse('No te puedes banear!')
                .catch(error => { enviarError(error, message.author) })

        if (bans.includes(args[0]))
            return embedResponse('El usuario ya estaba baneado!')
                .catch(error => { enviarError(error, message.author) })

        await client.updateData({ token: `${args[1]}` }, { $addToSet: { bans: `${args[0]}` } }, 'chat');
        await client.updateData({ token: `${args[1]}` }, { $pull: { users: `${args[0]}` } }, 'chat');
        await client.updateData({ token: `${args[1]}` }, { $pull: { joinable: `${args[0]}` } }, 'chat');
        await client.updateData({ token: `${args[1]}` }, { $pull: { admins: `${args[0]}` } }, 'chat');
        await client.updateData({ id: `${args[0]}` }, { $pull: { unidos: `${args[1]}` } }, 'usuario');
        await client.updateData({ id: `${args[0]}` }, { token: `none` }, 'usuario');

        embedResponse(`Has baneado a ${user.tag} del chat!`)
            .catch(error => { enviarError(error, message.author) })


    }

    else if (command === 'unbanchat') {

        if (!args[0] || !args[1])
            return embedResponse('Ejemplo de uso: <prefix>unbanchat user_id token_chat')
                .catch(error => { enviarError(error, message.author) })

        let user = client.users.cache.get(args[0]);

        if (!user)
            return embedResponse('No he encontrado ese usuario!')
                .catch(error => { enviarError(error, message.author) })

        let checkM = await rModel('chat').findOne({ token: args[1] });

        if (!checkM)
            return embedResponse('Token inexistente!')
                .catch(error => { enviarError(error, message.author) })

        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, owner, users, max, token, description, name } = chatG;

        if (!admins.includes(message.author.id))
            return embedResponse('Solos los admins pueden desbanear!')
                .catch(error => { enviarError(error, message.author) })

        if (args[0] == owner || args[0] == message.author.id)
            return embedResponse('No te puedes desbanear!')
                .catch(error => { enviarError(error, message.author) })

        if (!bans.includes(args[0]))
            return embedResponse('El usuario ya estaba desbaneado!')
                .catch(error => { enviarError(error, message.author) })

        await client.updateData({ token: args[1] }, { $pull: { bans: `${args[0]}` } }, 'chat');

        embedResponse(`Has desbaneado a ${user.tag} del chat!`)
            .catch(error => { enviarError(error, message.author) })


    }

    else if (command === 'editchat') {

        let check = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

        if (!args[0])
            return embedResponse('Escribe que quieres cambiar!\nEjemplo de uso: <prefix>editchat token_chat name(description o maxusers) new_name(description o maxusers)')
                .catch(error => { enviarError(error, message.author) })
        let checkM = await rModel('chat').findOne({ token: args[0] });

        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, admins, owner } = chatG;

        if (!checkM)
            return embedResponse('Token invalido!')
                .catch(error => { enviarError(error, message.author) });

        if (args[1] === 'name') {
            if (owner !== message.author.id)
                return embedResponse('No puedes cambiar el nombre del chat!')
                    .catch(error => { enviarError(error, message.author) })

            if (!args[2] || args.slice(2).length >= 21)
                return embedResponse('Elije un nombre con un nombre menor o igual a 20 caracteres!')
                    .catch(error => { enviarError(error, message.author) })

            let regex = args.slice(2).join(' ').match(check);

            if (regex || args.slice(2).join(' ').includes('`'))
                return embedResponse('Ese nombre tiene caracteres no permitidos!')
                    .catch(error => { enviarError(error, message.author) });

            embedResponse(`Nombre cambiado a: ${args.slice(2).join(' ')}`)
                .catch(error => { enviarError(error, message.author) })
            return await client.updateData({ token: `${args[0]}` }, { name: args.slice(2).join(' ') }, 'chat');

        }
        else if (args[1] === 'description') {
            if (owner !== message.author.id)
                return embedResponse('No puedes cambiar la descripción del chat!')
                    .catch(error => { enviarError(error, message.author) })

            if (!args[2] || args.slice(2).length >= 51)
                return embedResponse('Elije una descripción con un nombre menor o igual a 50 caracteres!')
                    .catch(error => { enviarError(error, message.author) })

            let regex = args.slice(2).join(' ').match(check);

            if (regex || args.slice(2).join(' ').includes('`'))
                return embedResponse('Esa descripción tiene caracteres no permitidos!')
                    .catch(error => { enviarError(error, message.author) });

            embedResponse(`Descripción cambiada a: ${args.slice(2).join(' ')}`)
                .catch(error => { enviarError(error, message.author) })
            return await client.updateData({ token: `${args[0]}` }, { description: args.slice(2).join(' ') }, 'chat');
        }

        else if (args[1] === 'maxusers') {
            if (owner !== message.author.id)
                return embedResponse('No puedes cambiar el maximo de usuarios del chat!')
                    .catch(error => { enviarError(error, message.author) });

            if (!parseInt(args[2]) || parseInt(args[2]) >= 51)
                return embedResponse('Elije un maximo de usuarios menor o igual a 50!')
                    .catch(error => { enviarError(error, message.author) })

            embedResponse(`Maximo cambiado a: ${args[2]}`)
                .catch(error => { enviarError(error, message.author) });

            return await client.updateData({ token: `${args[0]}` }, { max: args[2] }, 'chat');
        }

        else {
            return embedResponse('Elije una opción entre `name`, `description` o `maxusers`!')
                .catch(error => { enviarError(error, message.author) })
        }

    }

    else if (command === 'publiclist') {
        let seleccion = parseInt(args[0]) || 1;

        if (seleccion < 1) {
            seleccion = 1
        }

        let paginas = funcionPagina((await getPublicList(message)), 5)
        if (!paginas[seleccion - 1])
            return embedResponse("Pagina inexistente!")
                .catch(error => { enviarError(error, message.author) });

        embedResponse(paginas[seleccion - 1].join('\n'))
            .catch(error => { enviarError(error, message.author) });
    }

    else if (command === 'sendchat') {

        let check = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

        let chatU = await client.getData({ id: message.author.id }, 'usuario');

        let embed = new Discord.MessageEmbed()
            .setAuthor('No hay nada aq... Oh, mira a wumpus!')
            .setImage('https://i.imgur.com/YCORRwg.png')
            .setColor(color)
            .setFooter('Usa <prefix>setchat token_chat para ver un chat existente!')
            .setTimestamp()

        let { tokenChat } = chatU;

        if (!tokenChat || tokenChat == 'none')
            return embedResponse('Establece un chat!\n<prefix>setchat token_chat')
                .catch(error => { enviarError(error, message.author) });

        let xCheck = await rModel('chat').findOne({ token: tokenChat });

        if (!xCheck)
            return embedResponse("El chat que tienes establecido no existe!")
                .catch(error => { enviarError(error, message.author) })

        let { bans } = await client.getData({ token: tokenChat }, 'chat')


        if (bans.includes(message.author.id)) {
            client.updateData({ id: message.author.id }, { tokenChat: 'none' }, 'usuario');

            return message.channel.send({ embed: embed.setFooter('Oh oh, parece que estas baneado!') })
                .catch(error => { enviarError(error, message.author) })
        }
        if (!args[0])
            return embedResponse('Ejemplo de uso: <prefix>sendchat Hola gente!')
                .catch(error => { enviarError(error, message.author) })

        let regex = args.join(' ').match(check);

        let regexTag = message.author.tag.match(check);

        if (regex || args.join(' ').includes('`'))
            return embedResponse('Este comando no permite caracteres especiales!')
                .catch(error => { enviarError(error, message.author) });

        if (args.join(' ').length >= 131)
            return embedResponse('El limite del texto es 130 letras!')
                .catch(error => { enviarError(error, message.author) })

        if (regexTag) {
            res = '[EspecialUser#' + message.author.discriminator + ']';
        }
        else {
            res = "[" + message.author.tag + "]";
        }

        embedResponse(`Enviado: ${args.join(' ')}`)
            .catch(error => { enviarError(error, message.author) })
        await client.updateData({ token: tokenChat }, { $addToSet: { users: message.author.id } }, 'chat');
        return client.updateData({ token: tokenChat }, { $push: { chat: `[${Hora()}]${res}: ${args.join(' ')}` } }, 'chat');
    }

    else if (command === 'userchats') {

        let seleccion = parseInt(args[0]) || 1;

        if (seleccion < 1) {
            seleccion = 1
        }

        let paginas = funcionPagina((await getListUserOwner(message)), 5);

        if (!paginas[seleccion - 1])
            return embedResponse("Pagina inexistente!")
                .catch(error => { enviarError(error, message.author) });

        embedResponse(paginas[seleccion - 1].join('\n'))
            .catch(error => { enviarError(error, message.author) });

    }

    else if (command === 'listchats') {

        let seleccion = parseInt(args[0]) || 1;

        if (seleccion < 1) {
            seleccion = 1
        }

        let paginas = funcionPagina((await getListUser(message)), 5);

        if (!paginas[seleccion - 1])
            return embedResponse("Pagina inexistente!")
                .catch(error => { enviarError(error, message.author) });

        embedResponse(paginas[seleccion - 1].join('\n'))
            .catch(error => { enviarError(error, message.author) });

    }

    else if (command === 'invitechat') {

        if (!args[0])
            return embedResponse('Ejemplo de uso: `<prefix> invitechat user_id token_chat`')
                .catch(error => { enviarError(error, message.author) });

        let check = await rModel('chat').findOne({ token: args[1] });

        if (!check)
            return embedResponse('Token invalido!')
                .catch(error => { enviarError(error, message.author) });

        let chatG = await client.getData({ token: args[1] }, 'chat');

        let { type, bans, joinable, admins, users } = chatG;

        if (!admins.includes(message.author.id)) {
            return embedResponse('No puedes invitar a nadie sin ser admin!')
                .catch(error => { enviarError(error, message.author) })
        }

        if (bans.includes(args[0]))
            return embedResponse('Ese usuario está baneado, usa <prefix>unbanchat user_id token_chat!')
                .catch(error => { enviarError(error, message.author) });

        if (!client.users.cache.get(args[0]))
            return embedResponse('No he encontrado a ese usuario!')
                .catch(error => { enviarError(error, message.author) })

        if (joinable.includes(args[0]))
            return embedResponse('Ya lo has invitado al chat!')
                .catch(error => { enviarError(error, message.author) });

        if (users.includes(args[0]))
            return embedResponse('Ya está en el chat!')
                .catch(error => { enviarError(error, message.author) });

        await client.updateData({ token: args[1] }, { $addToSet: { joinable: args[0] } }, 'chat');

        return embedResponse(`Has invitado a \`${client.users.cache.get(args[0]).tag}\`!`)
            .catch(error => { enviarError(error, message.author) });

    }

    else if (command === 'setchat') {

        let embed = new Discord.MessageEmbed()
            .setAuthor('No hay nada aq... Oh, mira a wumpus!')
            .setImage('https://i.imgur.com/YCORRwg.png')
            .setColor(color)
            .setFooter('Usa <prefix>setchat token_chat para ver un chat existente!')
            .setTimestamp()

        if (!args[0])
            return embedResponse('Escribe un token de chat!')
                .catch(error => { enviarError(error, message.author) });

        let check = await rModel('chat').findOne({ token: args[0] });

        if (!check)
            return embedResponse('Token invalido!')
                .catch(error => { enviarError(error, message.author) });

        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, owner, users } = chatG;

        if (type === 'private') {
            if (!joinable.includes(message.author.id))
                return embedResponse('No te puedes unir, es un chat privado y no te han invitado!')
                    .catch(error => { enviarError(error, message.author) })
        }

        if (bans.includes(message.author.id)) {
            client.updateData({ id: message.author.id }, { tokenChat: 'none' }, 'usuario');

            return message.channel.send({ embed: embed.setFooter('Oh oh, parece que estas baneado!') })
                .catch(error => { enviarError(error, message.author) })
        }

        if (!users.includes(message.author.id)) {
            let res;
            let checkR = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

            if (message.author.tag.match(checkR) || message.content.includes('`')) {
                res = `[EspecialUser#${message.author.discriminator}]`;
            }
            else {
                res = `[${message.author.tag}]`;
            }
            await client.updateData({ token: args[0] }, { $push: { chat: `[${Hora()}][LOGS]${res} se ha unido al chat!` } }, 'chat');
        }

        await client.updateData({ id: message.author.id }, { tokenChat: `${args[0]}` }, 'usuario');
        await client.updateData({ token: args[0] }, { $addToSet: { users: message.author.id } }, 'chat');
        if (owner !== message.author.id) {
            await client.updateData({ id: message.author.id }, { $addToSet: { unidos: args[0] } }, 'usuario');
        }

        return embedResponse('Chat establecido!\nToken: ' + args[0])
            .catch(error => { enviarError(error, message.author) });

    }

    else if (command === 'leavechat') {

        if (!args[0])
            return embedResponse('Escribe un token de chat!')
                .catch(error => { enviarError(error, message.author) });

        let check = await rModel('chat').findOne({ token: args[0] });

        if (!check)
            return embedResponse('Token invalido!')
                .catch(error => { enviarError(error, message.author) });

        let chatG = await client.getData({ token: args[0] }, 'chat');

        let { type, bans, joinable, users, owner } = chatG;

        if (!users.includes(message.author.id))
            return embedResponse('No estas en el chat!').catch(error => { enviarError(error, message.author) })

        if (owner === message.author.id)
            return embedResponse('No puedes abandonar el chat, borrala!').catch(error => { enviarError(error, message.author) })

        await client.updateData({ id: message.author.id }, { tokenChat: `none` }, 'usuario');
        await client.updateData({ token: args[0] }, { $pull: { users: message.author.id } }, 'chat');
        await client.updateData({ token: args[0] }, { $pull: { admins: message.author.id } }, 'chat');
        await client.updateData({ id: message.author.id }, { $pull: { unidos: args[0] } }, 'usuario');
        await client.updateData({ token: args[0] }, { $pull: { joinable: message.author.id } }, 'chat');
        let res;
        let checkR = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

        if (message.author.tag.match(checkR) || message.content.includes('`')) {
            res = `[EspecialUser#${message.author.discriminator}]`;
        }
        else {
            res = `[${message.author.tag}]`;
        }
        await client.updateData({ token: args[0] }, { $push: { chat: `[${Hora()}][LOGS]${res} ha dejado el chat!` } }, 'chat');

        return embedResponse('Has dejado el chat: ' + args[0])
            .catch(error => { enviarError(error, message.author) });

    }

    //fin de gchat

    //inicio de creditos

    else if (command === 'creditos') {
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`
            \`\`\`js\nconst Ayuda_de_mongoose_y_funciones = \"${getUser(client, '398485728172179477').username}\"\nconst Extras = [\"${getUser(client, '393382613047574530').username}\", \"${getUser(client, '577000793094488085').username}\"]\`\`\`
            `, { split: true })
            .setFooter('Gracias por todo!', client.users.cache.get('507367752391196682').displayAvatarURL())
            .setTimestamp()
        message.channel.send({ embed: embed }).catch(err => enviarError(err, message.author))
    }

    //fin de creditos

    //inicio de xd
    else if (command === 'xd') {

        let member = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.member;

        const canvas = Canvas.createCanvas(200, 200);
        const ctx = canvas.getContext('2d');
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png', size: 2048 }));

        Canvas.registerFont('OpenSansEmoji.ttf', { family: "Open Sans Emoji" })
        Canvas.registerFont('Minecrafter.Reg.ttf', { family: "Minecraft" })

        ctx.drawImage(avatar, 0, 0, 200, 200);

        ctx.font = '50px "Open Sans Emoji"'

        ctx.fillText('._.XD', 50, 180);

        let resultado = new Discord.MessageAttachment(canvas.toBuffer(), 'xd.png');
        message.channel.send(resultado).catch(err => { enviarError(err, message.author) });
    }
    //fin de xd

    //inicio de muteall
    else if (command === 'muteall') {

        let canalVoz = message.member.voice.channel;

        await among(message, message.member, canalVoz, message.channel, true)//.catch(err => { })

    }
    //fin de muteall

    else if (command === 'setmessageid') {
        let rol = message.guild.roles.cache.find(a => a.name === 'Among Us manager');
        if (!rol || !message.member.roles.cache.has(rol.id)) return embedResponse('Tienes que tener el rol `Among Us manager`')
        if (!args[0]) return embedResponse('Ponga una ID valida de mensaje!');
        let canal = message.mentions.channels.first() || message.channel
        if (messageSS(args[0], canal) === false) return embedResponse('No encontre el mensaje!\nUse: ' + prefix + 'setmessageid <id> <#mencion>')
        client.updateData({ id: message.guild.id }, { idMessage: args[0] }, 'muteid');
        canal.messages.fetch(args[0]).then(async (a) => {
            await a.react('751908729930121376').catch(err => { })
            await a.react('751908729624068226').catch(err => { })
        })
        return embedResponse('Establecido en: <#' + canal.id + '>');
    }

    //inicio de unmuteall
    else if (command === 'unmuteall') {

        let canalVoz = message.member.voice.channel;

        await among(message, message.member, canalVoz, message.channel, false)//.catch(err => { })

    }
    //fin de unmuteall

    else if (command === 'sangre') {
        if (message.guild.id !== '757067889550557205')
            return;
        let res = `🩸${random(10, 90)}%`;
        embedResponse(res).catch(err => { enviarError(err, message.author) });
    }

    else if (command === 'sintomas') {
        if (message.guild.id !== '757067889550557205')
            return;
        let arraySick = ['dolor de estomago', 'dolor de cabeza', 'disparo en el torax', 'ojo apuñalado', 'pierna rota', 'brazo roto', 'craneo roto', 'pie roto', 'disparo en la pierna', 'diarrea', 'mareo'];
        let res = arraySick[Math.floor(Math.random() * arraySick.length)];
        embedResponse(`Sintoma: ${res}`).catch(err => { enviarError(err, message.author) });
    }

    else {
        let embed = new Discord.MessageEmbed()
            .setThumbnail(`https://cdn.discordapp.com/attachments/688054761706094725/714328885533343764/error.gif`)
            .setDescription(`<:ohno:721174460073377804> » El comando que escribiste no existe o esta mal escrito!\nPuedes consultar mis comandos con ${prefix}help.\nProblemas?\n⚙️ \`»\` [➲ Soporte](https://discord.gg/hbSahh8)`)
            .setTimestamp()
            .setColor(color)
        message.channel.send({ embed: embed }).then(msg => {
            msg.delete({ timeout: 10000 })
            message.delete({ timeout: 10000 }).catch(a => { })
        }).catch(error => { enviarError(error, message.author) });

    }
});
// <-- FUNCION PLAY (REPRODUCIR): -->

function embedMusic(argumentoDeLaDescripcion, opcion) {
    let canal_a_enviar = opcion
    return canal_a_enviar.send({
        embed: new Discord.MessageEmbed()
            .setDescription(argumentoDeLaDescripcion)
            .setColor(color)
            .setImage('https://cdn.discordapp.com/attachments/632098744262721564/633640689955110912/nitro.gif')
            .setTimestamp()
    }).catch(error => { });
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    } try {
        // if (serverQueue.songs.length === 0) return serverQueue.textChannel.send('Lista de reproducción acabada.');
        const dispatcher = serverQueue.connection.play(ytdl(song.url))
            .on('finish', () => {
                serverQueue.songs.shift();
                //console.log(serverQueue.songs)
                play(guild, serverQueue.songs[0]);
                if (!serverQueue.songs[0]) return;
                embedMusic(`Reproduciendo: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) - ${serverQueue.songs[0].time} - ${serverQueue.songs[0].author.toString()}`, serverQueue.textChannel)
            })
            .on('error', error => {
                serverQueue.textChannel.send(`Error:\n${error}`)
                queue.delete(guild.id);
            });
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    } catch (e) { }
}
//fin de musica
//?inicio de eventos
//?inicio mensajes eventos

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (!newMessage.author) return;
    if (!oldMessage.content) return;
    if (!newMessage.content) return;
    if (!newMessage.guild || !oldMessage.guild) return;
    await client.getData({ id: newMessage.guild.id }, 'logs').then((data) => {
        if (newMessage.author.bot) return;
        if (newMessage.channel.type === 'dm') return;
        if (newMessage.content === oldMessage.content) return;
        client.emit('message', newMessage);
        if (!data) return;
        if (!newMessage.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('<:messageUpdate:723267945194586122> Message Updated')
            .addField('• Old message', oldMessage.content, true)
            .addField('• New message', newMessage.content, true)
            .addField('• Link', `[Link of the message](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`, false)
            .addField('• Author', newMessage.author.tag, true)
            .addField('• Author ID', newMessage.author.id, true)
            .addField('• Author mention', `<@${newMessage.author.id}>`, false)
            .addField('• Author channel name', newMessage.channel.name, true)
            .addField('• Author channel ID', newMessage.channel.id, true)
            .addField('• Author channel mention', `<#${newMessage.channel.id}>`, false)
            .setFooter(newMessage.guild.name, newMessage.guild.iconURL({ format: 'png', size: 2048 }))
            .setTimestamp()
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('messageDelete', async (message) => {
    if (!message) return;
    if (!message.author) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content) return;
    await client.updateData({ id: message.channel.id }, { snipe: `${message.content}${ayuda}<@${message.author.id}>` }, 'snipe')

    await client.getData({ id: message.guild.id }, 'logs').then(async (data) => {

        if (!data) return;
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('<:messageDelete:723270093475414026> Message Deleted')
            .addField('• Message', message.content)
            .addField('• Author', message.author.tag, true)
            .addField('• Author ID', message.author.id, true)
            .addField('• Author mention', `<@${message.author.id}>`, false)
            .addField('• Author channel name', message.channel.name, true)
            .addField('• Author channel ID', message.channel.id, true)
            .addField('• Author channel mention', `<#${message.channel.id}>`, false)
            .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', size: 2048 }))
            .setTimestamp()
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});
/*
//!fin mensajes eventos
//?inicio de roles eventos

client.on('roleUpdate', async (oldRole, newRole) => {
    let listaAddeds = []
    let listaRemoveds = []
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

    if (!oldRole.permissions.has('DEAFEN_MEMBERS') && newRole.permissions.has('DEAFEN_MEMBERS')) listaAddeds.push('Deafen members');
    if (oldRole.permissions.has('DEAFEN_MEMBERS') && !newRole.permissions.has('DEAFEN_MEMBERS')) listaRemoveds.push('Deafen members');

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

    await client.getData({ id: newRole.guild.id }, 'logs').then((data) => {

        if (!data) return;

        if (oldRole.permissions.bitfield === newRole.permissions.bitfield) return;

        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let addeds = listaAddeds.length >= 1 ? listaAddeds.join(', ') : '\u200b'
        let removeds = listaRemoveds.length >= 1 ? listaRemoveds.join(', ') : '\u200b'
        if (addeds === removeds) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Addeds permissions', addeds, true)
            .addField('• Removeds permissions', removeds, true)
            .addField('• Role', `${newRole.name}(${newRole.id})`)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleUpdate', async (oldRole, newRole) => {
    await client.getData({ id: oldRole.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldRole.name === newRole.name) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Old name', oldRole.name, true)
            .addField('• New name', newRole.name, true)
            .addField('• Role ID', newRole.id, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleUpdate', async (oldRole, newRole) => {
    await client.getData({ id: oldRole.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldRole.hoist === newRole.hoist && oldRole.mentionable === newRole.mentionable) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Hoist role', newRole.hoist, true)
            .addField('• Mentionable role', newRole.mentionable, true)
            .addField('• Role', `${newRole.name}(${newRole.id})`, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});


client.on('roleUpdate', async (oldRole, newRole) => {
    await client.getData({ id: oldRole.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldRole.hexColor === newRole.hexColor) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Old color', oldRole.hexColor, true)
            .addField('• New color', newRole.hexColor, true)
            .addField('• Role', `${newRole.name}(${newRole.id})`, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleUpdate', async (oldRole, newRole) => {

    await client.getData({ id: oldRole.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldRole.position === newRole.position) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Old position', oldRole.position, true)
            .addField('• New position', newRole.position, true)
            .addField('• Role', `${newRole.name}(${newRole.id})`, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleCreate', async (role) => {
    await client.getData({ id: role.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (!role.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Created')
            .addField('• Role name', role.name, true)
            .addField('• Role ID', role.id, true)
            .addField('• Role color', role.hexColor, true)
            .setTimestamp()
            .setFooter(role.guild.name, role.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleDelete', async (role) => {
    await client.getData({ id: role.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (!role.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Deleted')
            .addField('• Role name', `${role.name}`, true)
            .addField('• Role ID', role.id, true)
            .addField('• Role color', role.hexColor, true)
            .setTimestamp()
            .setFooter(role.guild.name, role.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});


//!fin de roles eventos
//?inicio servidor eventos
client.on('guildUpdate', async (oldGuild, newGuild) => {
    await client.getData({ id: newGuild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldGuild.name === newGuild.name) return;
        if (!newGuild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Guild Updated')
            .addField('• Old name', oldGuild.name, true)
            .addField('• New name', newGuild.name, true)
            .addField('• Guild ID', newGuild.id, true)
            .setTimestamp()
            .setFooter(newGuild.name, newGuild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('guildUpdate', async (oldGuild, newGuild) => {
    await client.getData({ id: newGuild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldGuild.systemChannelID === newGuild.systemChannelID) return;
        if (!newGuild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Guild Updated')
            .addField('• Old channel', `<#${oldGuild.systemChannelID}>(${newGuild.systemChannelID})`, true)
            .addField('• New channel', `<#${newGuild.systemChannelID}>(${newGuild.systemChannelID})`, true)
            .addField('• Guild', `${newGuild.name}(${newGuild.id})`, true)
            .setTimestamp()
            .setFooter(newGuild.name, newGuild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('guildUpdate', async (oldGuild, newGuild) => {
    await client.getData({ id: newGuild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldGuild.verificationLevel === newGuild.verificationLevel) return;
        if (!newGuild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Guild Updated')
            .addField('• Old verification level', capitalize(oldGuild.verificationLevel), true)
            .addField('• New verification level', capitalize(newGuild.verificationLevel), true)
            .addField('• Guild', `${newGuild.name}(${newGuild.id})`, true)
            .setTimestamp()
            .setFooter(newGuild.name, newGuild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});
//!fin servidor eventos
//?inicio canales eventos

client.on('channelCreate', async (channel) => {
    if (!channel.guild) return;
    await client.getData({ id: channel.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (!channel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Created')
            .addField('• Channel name', channel.name, true)
            .addField('• Channel ID', channel.id, true)
            .setTimestamp()
            .setFooter(channel.guild.name, channel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('channelDelete', async (channel) => {
    if (!channel.guild) return;
    await client.getData({ id: channel.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (!channel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Deleted')
            .addField('• Channel name', channel.name, true)
            .addField('• Channel ID', channel.id, true)
            .setTimestamp()
            .setFooter(channel.guild.name, channel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; }); // doc.channellogs o como hayas definido el canal de logs (supongo que para eso estás usando esta config)
    });
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    if (!oldChannel.guild || !newChannel.guild) return;
    await client.getData({ id: newChannel.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldChannel.name === newChannel.name) return;
        if (!newChannel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Updated')
            .addField('• Old name', oldChannel.name, true)
            .addField('• New name', newChannel.name, true)
            .addField('• Channel ID', `${newChannel.id}`, true)
            .setTimestamp()
            .setFooter(newChannel.guild.name, newChannel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    await client.getData({ id: newChannel.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldChannel.rateLimitPerUser === newChannel.rateLimitPerUser) return;
        if (!newChannel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Updated')
            .addField('• Old cooldown', oldChannel.rateLimitPerUser + 's', true)
            .addField('• New cooldown', newChannel.rateLimitPerUser + 's', true)
            .addField('• Channel', `${newChannel.name}(${newChannel.id})`, true)
            .setTimestamp()
            .setFooter(newChannel.guild.name, newChannel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});


client.on('channelUpdate', async (oldChannel, newChannel) => {
    await client.getData({ id: newChannel.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldChannel.topic === newChannel.topic) return;
        if (!newChannel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Updated')
            .addField('• Old topic', !oldChannel.topic ? '\u200b' : oldChannel.topic, true)
            .addField('• New topic', !newChannel.topic ? '\u200b' : newChannel.topic, true)
            .addField('• Channel', `${newChannel.name}(${newChannel.id})`, true)
            .setTimestamp()
            .setFooter(newChannel.guild.name, newChannel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});
//!fin canales eventos

//?inicio usuarios eventos

client.on('guildMemberAdd', async (member) => {
    if (member.guild.id === '645463565813284865')
        return member.roles.add('649011203791912981');
})

client.on('guildMemberUpdate', async (oldUser, newUser) => {
    await client.getData({ id: newUser.guild.id }, 'logs').then((data) => {

        if (!data) return;
        if (oldUser.nickname === newUser.nickname) return;
        let nickname1;
        let nickname2;
        if (oldUser.nickname === null) nickname1 = '\u200b';
        else nickname1 = oldUser.nickname;
        if (newUser.nickname === null) nickname2 = '\u200b';
        else nickname2 = newUser.nickname;
        if (!newUser.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• User Updated')
            .addField('• Old nickname', nickname1, true)
            .addField('• New nickname', nickname2, true)
            .addField('• User', `${newUser.user.username}(${newUser.user.id})`, true)
            .setTimestamp()
            .setFooter(newUser.guild.name, newUser.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});
//!fin usuarios eventos
//!fin de eventos
*/
/*client.on('message', async (msg) => {
    if (msg.channel.type !== 'text') return;

    msg.channel.messages.fetch({ limit: 3 }).then(m => {
        let a = [...m.values()].filter(E => !E.author.bot && E.content)
        let e = [...m.values()].filter(E => !E.author.bot && E.content)

        if (!a[2]) return;

        if (a[0].content.toLowerCase() === a[1].content.toLowerCase() && a[1].content.toLowerCase() === a[2].content.toLowerCase() &&
            e[0].author.id !== e[1].author.id && e[1].author.id !== e[2].author.id && e[0].author.id !== e[2].author.id) {
            msg.channel.send(a[2].content).catch(error => { });
        };
    });
});*/
let cooldownAmong = new Set()
client.on('message', async (m) => {
    if (m.author.bot) return;
    let message = m;
    let msg = m;
    if (message.channel.name.includes('among-us-manager')) {

        //inicio de muteall
        if (message.content.toLowerCase() === 'muteall') {

            if (cooldownAmong.has(message.author.id)) {
                return embedResponse('Estas en cooldown de 3s!').catch(err => { })
            }

            let canalVoz = message.member.voice.channel;

            await among(message, message.member, canalVoz, message.channel, true)//.catch(err => { })

            cooldownAmong.add(message.author.id);
            setTimeout(() => {
                cooldownAmong.delete(message.author.id);
            }, 3000);

        }
        //fin de muteall

        //inicio de unmuteall
        if (message.content.toLowerCase() === 'unmuteall') {

            if (cooldownAmong.has(message.author.id)) {
                return embedResponse('Estas en cooldown de 2s!').catch(err => { })
            }

            let canalVoz = message.member.voice.channel;

            await among(message, message.member, canalVoz, message.channel, false)//.catch(err => { })

            cooldownAmong.add(message.author.id);
            setTimeout(() => {
                cooldownAmong.delete(message.author.id);
            }, 3000);

        }
        //fin de unmuteall
    } else {
        if (msg.channel.type !== 'text') return;
        msg.channel.messages.fetch({ limit: 3 }).then(m => {
            let a = [...m.values()].filter(E => !E.author.bot && E.content)
            let e = [...m.values()].filter(E => !E.author.bot && E.content)

            if (!a[2]) return;

            if (a[0].content.toLowerCase() === a[1].content.toLowerCase() && a[1].content.toLowerCase() === a[2].content.toLowerCase() &&
                e[0].author.id !== e[1].author.id && e[1].author.id !== e[2].author.id && e[0].author.id !== e[2].author.id) {
                msg.channel.send(a[2].content).catch(error => { });
            };
        });
    }

    function embedResponse(argumentoDeLaDescripcion, opcion) {
        let canal_a_enviar = opcion || message.channel
        return canal_a_enviar.send({
            embed: new Discord.MessageEmbed()
                .setDescription(argumentoDeLaDescripcion)
                .setColor(color)
                .setTimestamp()
        }).catch(error => { enviarError(error, message.author) });
    }


})

client.login(process.env.BOT_TOKEN);

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("[MongoDB]: Conectado a la base de datos Mongodb.");
}).catch((err) => {
    console.log(`[Error]: No se puede conectar a la base de datos de Mongodb. Error: ${err}`);
});


async function messageS(id) {
    return new Promise((resolve, reject) => {
        client.channels.cache.get('727948582556270682').messages.fetch(id)
            .then(() => {
                return resolve(true);
            })
            .catch(() => {
                return resolve(false);
            })
    })
}

async function messageSS(id, canal) {
    return new Promise((resolve, reject) => {
        canal.messages.fetch(id, true)
            .then(() => {
                return resolve(true);
            })
            .catch(() => {
                return resolve(false);
            })
    })
}

let cooldownR = new Set()

client.on('messageReactionAdd', async (reaction, user) => {
    //console.log('xd')
    if (!reaction.message.channel.guild) return;
    if (user.bot) return;
    let message = reaction.message;
    let guild = message.guild;
    let channel = message.channel;
    let emoji = reaction.emoji;
    let member = guild.member(user);

    let { idMessage } = await client.getData({ id: guild.id }, 'muteid');

    if (!idMessage || idMessage === 'id') return;

    if (!message.id === idMessage) return;

    //console.log(member.voice.channel)

    if (emoji.id === '751908729930121376') {

        if (cooldownR.has(user.id)) {
            return response('Estas en cooldown de 3s!', user).catch(a => { })
        }

        let canalVoz = member.voice.channel;

        cooldownR.add(user.id);
        setTimeout(() => {
            cooldownR.delete(user.id)
        }, ms('3s'))

        //unmute
        await among(reaction.message, member, canalVoz, user, false)//.catch(err => { })
        await reaction.users.remove(user).catch(a => { })
    }

    else if (emoji.id === '751908729624068226') {

        if (cooldownR.has(user.id)) {
            return response('Estas en cooldown de 3s!', user).catch(a => { })
        }
        let canalVoz = member.voice.channel;

        cooldownR.add(user.id);
        setTimeout(() => {
            cooldownR.delete(user.id)
        }, ms('3s'))
        //mute
        await among(reaction.message, member, canalVoz, user, true)//.catch(err => { })
        await reaction.users.remove(user).catch(a => { })
    }

});

function among(mensaje, member, canalVoz, canalText, bol) {
    let message = mensaje;

    if (!canalVoz) return response('Tienes que estar en un canal de voz!', canalText)
        .catch(err => { });

    if (!canalVoz.name.includes('Among Us')) return response('Tienes que estar en el canal llamado: `Among Us`', canalText)
        .catch(err => { });

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') || !member.voice.channel.permissionsFor(client.user).has("MANAGE_CHANNELS")) return response('Tengo que tener el permiso `MANAGE_CHANNELS`!', canalText)
        .catch(err => { });

    let rol = message.guild.roles.cache.find(a => a.name === 'Among Us manager');

    if (!rol) {
        message.guild.roles.create({ data: { name: 'Among Us manager' } }).catch(err => { });
    }

    if (!rol || !member.roles.cache.has(rol.id)) return response('Tienes que tener el rol llamado: `Among Us manager`!', canalText)
        .catch(err => { });

    if (!message.guild.me.hasPermission('MUTE_MEMBERS') || !member.voice.channel.permissionsFor(client.user).has("MUTE_MEMBERS")) return response('Tengo que tener el permiso `MUTE_MEMBERS`!', canalText)
        .catch(err => { });

    if (!message.guild.me.hasPermission('MANAGE_MESSAGES') || !member.voice.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return response('Tengo que tener el permiso `MANAGE_MESSAGES`!', canalText)
        .catch(err => { });

    if (canalVoz.userLimit < 10) {
        canalVoz.edit({ userLimit: 10 }).catch(err => { })
    }
    else {
        canalVoz.edit({ userLimit: 10 }).catch(err => { })
    }

    if (canalVoz.members.size > 15) return response('Hay más de 15 miembros en el canal!', canalText)
        .catch(err => { });

    let p = canalVoz.members.map(a => {
        a.voice.setMute(bol).catch(err => { })
    });

    response('<a:cargando:650442822083674112> En proceso!', canalText).then(async (msg) => {
        //msg.delete({ timeout: 5000 })
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .setDescription('Listo!')

        await Promise.all(p);

        msg.edit({ embed: embed }).then(a => { a.delete({ timeout: 5000 }) }).catch(err => { })
        //message.delete({ timeout: 5000 }).catch(err => { });
    }).catch(err => { });

}

function response(d, c) {
    let embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setDescription(d)
        .setColor(color)
    return c.send({ embed: embed })
};

//let array = ['hola', 'holaxd', 'hola como estas?', ':v', 'xd'];

//let resultado = funcionPagina(array, 2)
function funcionPagina(elArray, num) {
    let pagina = [];
    for (let i = 0; i < elArray.length; i += num) {
        pagina.push(elArray.slice(i, i + num))
    }
    return pagina;
}
//return resultado[0]; // ['hola', 'holaxd']

/*if (cooldown.has(`${message.guild.id}_gchat`)) {

    return embedResponse(mal + " Este comando tiene un cooldown de 3s global!(Por servidor)").catch(err => { enviarError(err, message.author) });

}

else {

    cooldown.add(`${message.guild.id}_gchat`);
    setTimeout(() => {
        cooldown.delete(`${message.guild.id}_gchat`);
    }, ms('3s'));

};

if (args[0] === 'send') {

    let check = /[^A-Z0-9\s\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\"\'\;\.\,\\\:\ñ\|\~\/\<\>(\uD800-\uDBFF][\uDC00-\uDFFF)]/gi;

    let regex = args.slice(1).join(' ').match(check);

    let member = message.member;

    if (!args[1]) return embedResponse(`Escribe algo!`).catch(err => { enviarError(err, message.author) });

    let txt = args.slice(1).join(' ');

    if (regex) return embedResponse(`Este comando no permite caracteres especiales!\nSi quieres sugerir un caracter especial pon z!suggest <caracter>.`).catch(err => { enviarError(err, message.author) });

    if (txt.includes('discord.gg/')) {
        embedResponse(`Este comando no permite invitaciones por obvias razones!`).catch(err => { enviarError(err, message.author) });
        return message.delete({ timeout: 1000 });
    }

    if (txt.includes('`')) return embedResponse(`Este comando no permite el acento grave!`).catch(err => { enviarError(err, message.author) });

    if (txt.length > 80) return embedResponse(`La longitud del texto debe ser menor a 80!`).catch(err => { enviarError(err, message.author) });

    client.updateData({ id: 'chat' }, {
        $push: {
            test:
                `${member.user.username.match(check) ? 'Usuario' : member.user.username.slice(0, 20)}#${member.user.discriminator}: ${txt}`
        }

    }, 'test');

    return embedResponse('Mensaje enviado!').catch(err => { enviarError(err, message.author) });
}

else {
    let { test } = await client.getData({ id: 'chat' }, 'test');

    if (!test || test.length === 0) return embedResponse('Al parecer no hay ningun mensaje...');

    test = test.reverse().slice(0, 10).reverse();
    let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTimestamp()
        .setDescription(`
        \`\`\`\n${test.join('\n\n')}\`\`\`
        `, { split: true }
        )
    message.channel.send({ embed: embed }).catch(err => { enviarError(err, message.author) });
};
*/
async function getPublicList(message) {

    let arrayList = [];
    let datos = await rModel('chat').find({ type: 'public' });

    for (let x of datos) {

        arrayList.push(`${x.name} - ${x.token} - ${x.users.length}/${x.max}${x.admins.includes(message.author.id) ? '[ADMIN]' : '\u200b'}`);

    }

    return arrayList;

}

async function getListUser(message) {

    let arrayList = [];
    let data = await rModel('chat').find();

    let datos = data.filter(a => a.users.includes(message.author.id));

    for (let x of datos) {

        arrayList.push(`${x.name} - ${x.token} - ${x.users.length}/${x.max}${x.admins.includes(message.author.id) ? '[ADMIN]' : '\u200b'}`);

    }

    return arrayList;

}

async function getListUserOwner(message) {

    let arrayList = [];
    let data = await rModel('chat').find();

    let datos = data.filter(a => a.owner === message.author.id);

    for (let x of datos) {

        arrayList.push(`${x.name} - ${x.token} - ${x.users.length}/${x.max}${x.admins.includes(message.author.id) ? '[ADMIN]' : '\u200b'}`);

    }

    return arrayList;

}

async function deleteChatByToken(tokenHere) {

    let { users } = await client.getData({ token: tokenHere }, 'chat');

    for (let x of users) {

        try {

            await client.updateData({ id: x }, { $pull: { grupos: tokenHere } }, 'usuario');

            await client.updateData({ id: x }, { $pull: { unidos: tokenHere } }, 'usuario');

        } catch (err) { }

    }

    try {

        rModel('chat').deleteOne({
            token: tokenHere
        }).exec();

    } catch (err) { }

    return true;

}