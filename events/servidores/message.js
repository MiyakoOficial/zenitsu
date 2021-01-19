const Discord = require("discord.js");
const ms = require('ms');
const cooldowns = new Discord.Collection();
let cooldownniveles = new Set();
module.exports = async (client, message) => {

    /* function emojiNitro(msg) {
         if (!msg.channel.permissionsFor(client.user).has('MANAGE_CHANNELS'))
             return;
         client.emojis.cache.filter(e => e.animated).map(e => e).forEach(async e => { //filtramos los emojis animados y luego los mapeamos
             if (msg.member.user.displayAvatarURL({ dynamic: true }).endsWith(".gif")) {
                 return;
             } //acá verificamos si el usuario tiene una foto animada, si es así retorna
             if (msg.content.includes(`:${e.name}:`)) {
                 let finalMessage = msg.content.replace(new RegExp(`:${e.name}:`, "gi"), e.toString()); // acá reemplazamos el emote en string del usuario por el animado que dará el bot
 
                 let name = msg.member.nickname || msg.member.user.username; //esto nos servirá para los webhooks
 
                 let webhook = await msg.channel.createWebhook(name, {
                     avatar: msg.member.user.displayAvatarURL({ dynamic: true }),
                     reason: `Emoji nitro ${name}`
                 }); //creamos el webhook con los datos proporcionados anteriormente
                 webhook.send(finalMessage).then(() => { //enviamos el mensaje
                     msg.delete(); //eliminamos el mensaje del autor
                     webhook.delete("Used"); //eliminamos el webhook luego de haberlo usado
                 });
             }
         });
     }*/

    //const prefix = (await client.getData({ id: message.guild.id }, 'prefix')).prefix || 'z!';
    if (!message || !message.guild || !message.author) return;
    client.serverQueue = client.queue.get(message.guild.id);

    client.updateData({ idMember: message.author.id, idGuild: message.guild.id }, { cacheName: message.author.tag }, 'niveles').catch(() => { })
    const prefix = message.guild.cachePrefix || await message.guild.getPrefix();
    message.guild.cachePrefix = prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase()

    if (message.author.bot) return;
    let emojiFinded = message.guild.emojis.cache.find(a => a.name === message.content.slice(2)) || client.emojis.cache.find(a => a.name === message.content.slice(2));
    //console.log(emojiFinded)
    if (message.content.slice(0, 2) === ': ' && emojiFinded) {
        if (message.deletable) message.delete();
        return message.channel.send(emojiFinded.toString())
    }
    let Random = Math.floor(Math.random() * 24) + 1;

    /*if (!message.member.hasPermission('ADMINISTRATOR') && settings.borrarInv && message.content.match(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g)) {

        if (message.deletable) {

            message.delete()
            return embedResponse('No tienes permitido enviar invitaciones.')
                .then(a => { a.delete({ timeout: 5000 }).catch(() => { }) })
                .catch(() => { })

        }

    }*/

    if (!message.content.startsWith(prefix)) {

        /*  if (['470235112873787402'].includes(message.guild.id)) {
              emojiNitro(message);
          }*/
        /*if (!settings.sistemaDeNiveles)
            return;
*/
        let guild = `${message.guild.id}_${message.author.id}`;
        //console.log(cooldownniveles)
        if (cooldownniveles.has(guild)) {
            return;
        }
        else {
            let dataN = await client.getData({ idMember: message.author.id, idGuild: message.guild.id }, 'niveles')
            let { xp, nivel } = await client.getData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, 'niveles');
            let levelup = 5 * (nivel ** 2) + 50 * nivel + 100;

            cooldownniveles.add(guild);
            setTimeout(() => {
                cooldownniveles.delete(guild);
            }, ms('45s'));

            if ((xp + Random) > levelup) {

                await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { xp: 0 }, 'niveles');
                await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { $inc: { nivel: 1 } }, 'niveles');

                //if (settings.mostrarAnuncio) {

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
                if (dataN.disableNotify) {
                    const { createCanvas, loadImage, registerFont } = require('canvas');

                    registerFont('/home/MARCROCK22/zenitsu/OpenSansEmoji.ttf', { family: "Open Sans Emoji" })
                    registerFont('/home/MARCROCK22/zenitsu/Minecrafter.Reg.ttf', { family: "Minecraft" })

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
                    channel.send(new Discord.MessageAttachment(canvas.toBuffer(), 'levelImage.png')).catch(() => { })
                } // Yes
                //}
                //embedResponse(`<@${message.author.id}>, subiste al nivel ${nivel + 1}!`, channel).catch(a => { });

            }

            else {
                await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { $inc: { xp: Random } }, 'niveles');
                //console.log(`${ message.author.tag } ganó ${ random }, es nivel: ${ nivel }, xp que tiene: ${ xp } `);
            }
            return; //console.log('no prefix message')
        }

    }

    let filter = e => {
        if (message.guild.id != '645463565813284865' && e.config.category == 'servidor') return false;
        else if (e.config.dev && !client.devseval.includes(message.author.id)) return false;
        return true
    }

    let commandfile = client.commands.filter(filter).get(command)
        || client.commands.filter(filter).get(client.alias.get(command))

    if (commandfile) {
        let dataB = (await client.getData({ id: message.author.id }, 'blacklist'))
        if (dataB.bol) {
            return;
        }
        //if (cooldownCommands.has(message.author.id)) {

        if (!cooldowns.has(commandfile.config.name)) {
            cooldowns.set(commandfile.config.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(commandfile.config.name);
        const cooldownAmount = (commandfile.config.cooldown || 4) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Por favor espera ${timeLeft.toFixed(1)} segundo(s) antes de usar \`${command}\`.`);
            }
        }

        else {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }

        let check = [];
        if (commandfile.config.botPermissions && commandfile.config.botPermissions) {

            let permisos = message.channel.permissionsFor(message.client.user);
            let permisosN = commandfile.config.botPermissions;
            for await (let i of permisosN) {
                if (!permisos.has(i)) {
                    check.push(i);
                }
            }
        }

        if (check.length >= 1) {

            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription('<:cancel:779536630041280522> | Ups, me faltan algun/algunos permiso(s): `' + check.join(', ') + "`")
                .setTimestamp()
                .setFooter('\u200b', 'https://media1.tenor.com/images/41334cbe64331dad2e2dc6272334b47f/tenor.gif');

            return message.channel.send({ embed: embed })
        }

        check = [];

        if (commandfile.config.memberPermissions && commandfile.config.memberPermissions) {

            let permisos = message.channel.permissionsFor(message.member);
            let permisosN = commandfile.config.memberPermissions;
            for await (let i of permisosN) {
                if (!permisos.has(i)) {
                    check.push(i);
                }
            }
        }

        if (check.length >= 1) {

            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription('<:cancel:779536630041280522> | Ups, te faltan algun/algunos permiso(s): `' + check.join(', ') + "`")
                .setTimestamp()
                .setFooter('\u200b', 'https://media1.tenor.com/images/41334cbe64331dad2e2dc6272334b47f/tenor.gif');

            return message.channel.send({ embed: embed })
        }
        try {
            await commandfile.run({ client, message, args, embedResponse, Hora })
        } catch (err) {


            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setTimestamp()
                .setDescription(`Ha ocurrido un error, reportalo en el servidor de soporte!`)
                .setFooter(`TIP: usa ${prefix}reportbug comando/comentario`, message.author.displayAvatarURL({ dynamic: true }))
                .setAuthor(`Link`, client.user.displayAvatarURL(), 'https://discord.gg/hbSahh8')
                .addField('Error', err)
                .addField('Comando usado', command)

            client.channels.cache.get('766012729411633164').send({ embed: embed })

            return await message.author.send({ embed: embed }).catch(() => { });
        }
    }

    /**
     * @async
     * @param {String} descriptionHere 
     * @param {Discord.TextChannel} option
     * @returns {Discord.Message} 
     */

    function embedResponse(descriptionHere, option) {

        let embed = new Discord.MessageEmbed()
            .setDescription(descriptionHere)
            .setTimestamp()
            .setColor(client.color);

        let canal = option || message.channel;

        return canal.send({ embed: embed })

    }

    function Hora(date = Date.now(), dia = false) {

        let fecha = new Date(date - ms('4h'))

        let hora = fecha.getHours();

        let minutos = fecha.getMinutes();

        let segundos = fecha.getSeconds();
        if (hora < 10) {
            hora = '0' + hora
        }

        if (minutos < 10) {
            minutos = '0' + minutos
        }
        if (segundos < 10) {
            segundos = "0" + segundos
        }
        if (!dia)
            return hora + ":" + minutos + ":" + segundos

        else {

            let dia = new Date(date - ms('4h')).getDay() + 1,
                mes = new Date(date - ms('4h')).getMonth() + 1,
                año = new Date(date - ms('4h')).getFullYear()

            return `${hora}:${minutos}:${segundos} - ${dia}/${mes}/${año}`

        }

    }

};
