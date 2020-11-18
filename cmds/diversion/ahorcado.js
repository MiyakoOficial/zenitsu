const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
    config: {
        name: "ahorcado", //Nombre del cmd
        alias: ['test'], //Alias
        description: "Ver el ultimo mensaje borrado", //Descripción (OPCIONAL)
        usage: "z!akinator",
        category: 'utiles'
    },
    run: async ({ message, embedResponse }) => {

        let nou = 0;

        message.guild.letrasdichas = [];
        message.guild.fallidas = [];
        message.guild.frase;

        let mention = message.mentions.users.first();
        let author = message.author;

        let chose = [author, mention];

        let chosed = chose[Math.floor(Math.random() * chose.length)];

        if (message.guild.playing)
            return embedResponse('Alguien en el servidor esta jugando.')

        message.guild.playing = true;

        const filter = m => m.author.id == mention.id;

        let aw = await waitRequest(mention, filter, message.channel)

        if (!aw) {
            delete message.guild.playing
            return embedResponse(`${mention.tag} no ha respondido correctamente.`)
        }

        await embedResponse(`Eleji a ${chosed.tag} para que elija la frase.`)

        let palabra = await waitWord(chosed, m => m.author.id == chosed.id)

        if (palabra == 'dm') {
            delete message.guild.playing
            return embedResponse(`${chosed.tag} tiene los dms desactivados.`)
        } if (!palabra) {
            embedResponse("No se elijio la frase")
            return delete message.guild.playing
        }
        message.guild.frase = palabra

        let embed = new MessageEmbed()
            .setColor(`#e74c3c`)
            .setDescription("```" + idk(message.guild.frase, message.guild.letrasdichas) + "```")
            .setFooter(`Dichas: ${message.guild.letrasdichas.join(', ')} | Fallidas: ${message.guild.fallidas.join(', ')}`)
        let msg = await message.channel.send({ embed: embed });

        const collector = message.channel.createMessageCollector(a => true);

        collector.on('collect', async m => {
            nou++
            embedResponse(m.author.id)
            if (m.author.id != chose.find(a => a.id != chosed.id))
                return;
            if (nou == 6) {
                nou = 0;
                msg.delete().catch(() => { })
                msg = await message.channel.send({
                    embed:
                        new MessageEmbed()
                            .setColor(`#e74c3c`)
                            .setDescription("```" + idk(message.guild.frase, message.guild.letrasdichas) + "```")
                            .setFooter(`Dichas: ${message.guild.letrasdichas.join(', ')} | Fallidas: ${message.guild.fallidas.join(', ')}`)
                })
            }
            if (m.content.length == 1 && !(/[^A-Z]/gi.test(m.content))) {

                if (message.guild.letrasdichas.includes(m.content.toLowerCase()) || message.guild.fallidas.includes(m.content.toLowerCase()))
                    return m.reply('Ya habias dicho ese letra.')
                        .then(a => a.delete({ timeout: 2000 }))

                if (message.guild.frase.includes(m.content.toLowerCase())) {
                    message.guild.letrasdichas.push(m.content.toLowerCase())
                    m.reply('Sip, esa letra esta en la frase.')
                        .then(a => a.delete({ timeout: 2000 }))
                }

                else {
                    m.reply('Fallaste.')
                        .then(a => a.delete({ timeout: 2000 }))
                    message.guild.fallidas.push(m.content.toLowerCase())
                    if (message.guild.fallidas.length >= 8) {
                        delete message.guild.playing;
                        message.guild.perdi = true;
                        collector.stop();
                        return embedResponse('Perdiste!\n\nLa frase era: ' + message.guild.frase)
                    }
                }
                if (idk(message.guild.frase, message.guild.letrasdichas) == message.guild.frase) collector.stop();
                message.guild.adivinador = m.author;
                return msg.edit({
                    embed:
                        msg.embeds[0].setFooter(`Dichas: ${message.guild.letrasdichas.join(', ')} | Fallidas: ${message.guild.fallidas.join(', ')}`)
                            .setDescription(`\`\`\`${idk(message.guild.frase, message.guild.letrasdichas)}\`\`\``)
                })
            }

        });

        collector.on('end', () => {
            if (!message.guild.perdi) {
                embedResponse(message.guild.adivinador.tag + ' ha ganado!')
                delete message.guild.playing
                delete message.guild.perdi
            }

        });

    }
};

async function waitWord(chosed, filter) {

    let palabra = await new Promise((give) => {
        chosed.send('Hola, fuiste elejido para escojer la palabra, cual quieres poner?\n\nSolo puede tener letras.').then(async () => {
            (await chosed.createDM()).awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    give(collected.array()[0].content)
                })
                .catch(() => {
                    return give(false);
                });
        })
            .catch(() => { give('dm') })
    })

    if (!palabra) return false;

    const regex = new RegExp(' ', 'gi');
    let idk = palabra.replace(regex, '')

    let check = /[^A-Z]/gi.test(idk)
    if (check)
        return await waitWord(chosed, filter)
    return palabra.toLowerCase();

}


function idk(string, dichas) {

    let res = [];

    string.split('').forEach(e => {

        if (e == '' || e == ' ')
            return res.push(' ')
        if (dichas.includes(e))
            return res.push(e);
        else {
            res.push('*')
        }
    })

    return res.join('');

}

async function waitRequest(mencion, filter, channel) {

    let palabra = await new Promise((give) => {
        channel.send('Hola ' + mencion.tag + " quieres jugar?, escribe `si`.").then(() => {
            channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    give(collected.array()[0].content)
                })
                .catch(() => {
                    console.log(`No ha respondido.`)
                    give('a')
                });
        })
    })

    if (palabra.toLowerCase() == 'si')
        return true;
    else return false;
}