const Discord = require("discord.js");
const ms = require('ms');
let cooldownniveles = new Set();
let cooldownCommands = new Set();
module.exports = async (client, message) => {
    const settings = await client.getData({ id: message.guild.id }, 'settings');
    /*
        function emojiNitro(msg) {
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
        }
    */
    //const prefix = (await client.getData({ id: message.guild.id }, 'prefix')).prefix || 'z!';
    client.color = '#E09E36';
    if (!message || !message.guild || !message.author) return;
    client.serverQueue = client.queue.get(message.guild.id);

    const prefix = (await client.getData({ id: message.guild.id }, 'prefix')).prefix;
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
    if (!message.content.startsWith(prefix)) {

        if (!settings.sistemaDeNiveles)
            return;

        // emojiNitro(message);

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
            }, ms('45s'));

            if ((xp + Random) > levelup) {

                await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { xp: 0 }, 'niveles');
                await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { $inc: { nivel: 1 } }, 'niveles');

                if (settings.mostrarAnuncio) {

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

                    channel.send(new Discord.MessageAttachment(canvas.toBuffer(), 'levelImage.png')).catch(e => { })
                }
                //embedResponse(`<@${message.author.id}>, subiste al nivel ${nivel + 1}!`, channel).catch(a => { });

            }

            else {
                await client.updateData({ idGuild: `${message.guild.id}`, idMember: `${message.author.id}` }, { $inc: { xp: Random } }, 'niveles');
                //console.log(`${ message.author.tag } ganó ${ random }, es nivel: ${ nivel }, xp que tiene: ${ xp } `);
            }
            return; //console.log('no prefix message')
        }

        return;
    }

    let commandfile = client.commands.get(command) || client.commands.get(client.alias.get(command))

    if (commandfile) {

        if (cooldownCommands.has(message.author.id)) {
            let embed = new Discord.MessageEmbed()
                .setDescription(`Wow, más despacio velocista!\nEl cooldown de los comandos es de 4s!`)
                .setThumbnail('https://media1.tenor.com/images/dcc0245798b90b4172a06be002620030/tenor.gif?itemid=14757407')
                .setColor(client.color)
                .setTimestamp()
            return message.channel.send({ embed: embed }).catch(e => { });
        }

        else {

            cooldownCommands.add(message.author.id);

            setTimeout(() => {

                cooldownCommands.delete(message.author.id);

            }, 4000);

        };

        let embedC = new Discord.MessageEmbed()
            .setColor(client.color)
            .addField(`Comando usado`, command)
            .addField('Autor', `${message.author.toString()}(${message.author.id})`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(`${message.guild.name}(${message.guild.id})`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        client.channels.cache.get('765757022489542686').send({ embed: embedC });

        return commandfile.run({ client, message, args, embedResponse, Hora }).catch(err => {

            let embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setTimestamp()
                .setDescription(`Ha ocurrido un error, reportalo en el servidor de soporte!`)
                .setFooter(`TIP: usa ${prefix}reportbug comando/comentario`, message.author.displayAvatarURL({ dynamic: true }))
                .setAuthor(`Link`, client.user.displayAvatarURL(), 'https://discord.gg/hbSahh8')
                .addField('Error', err)
                .addField('Comando usado', command)

            client.channels.cache.get('766012729411633164').send({ embed: embed })

            return message.author.send({ embed: embed }).catch(e => { });
        });
    };
    function embedResponse(descriptionHere, option, options) {

        let embed = new Discord.MessageEmbed()
            .setDescription(descriptionHere)
            .setTimestamp()
            .setColor(client.color);

        let canal = option || message.channel;

        return canal.send({ embed: embed })

    }

    function Hora() {
        let fecha = new Date(Date.now() - ms('4h'))

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

        return hora + ":" + minutos + ":" + segundos

    }

};