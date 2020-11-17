const Discord = require('discord.js');
const opciones = `Opciones validas:\n1- Si\n2- No\n3- No lo se\n4- Probablemente\n5- Probablamente no\n⏹️- Parar de jugar\n◀️- Volver atras.`;
const emojis = [`1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `⏹️`, `◀️`];
module.exports = {
    config: {
        name: "akinator", //Nombre del cmd
        alias: ['aki'], //Alias
        description: "Adivinar un personaje.", //Descripción (OPCIONAL)
        usage: "z!akinator",
        category: 'utiles'
    },
    run: async ({ message, embedResponse, client }) => {

        if (!message.channel.permissionsFor(message.client.user).has('MANAGE_MESSAGES'))
            return embedResponse('Necesito el permiso `MANAGE_MESSAGES`.')

        const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id;

        let i = 0;

        if (message.guild.aki)
            return embedResponse('Alguien esta jugando.')
        else {
            message.guild.aki = true;
        }
        message.channel.send('🤔')
        const mech_aki = require("mech-aki");
        let akinator = new mech_aki("es");
        //let colector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id);
        let msg = await message.channel.send('Espera unos momentos.')

        let respuesta = await akinator.empezar();


        for (let i of emojis) {

            await msg.react(i)

        }

        msg = await msg.edit(`\u200b`, {
            embed: new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription(opciones)
                .setAuthor(respuesta.pregunta)
        })

        let colector = msg.createReactionCollector(filter);

        colector.on('collect', async (c, u) => {
            console.log(u)
            c.users.remove(u).catch(() => { })

            if (c.emoji.name == '⏹️') {
                msg.delete();
                message.guild.stoped = true
                return colector.stop();
            }

            let respuesta;

            if (i != 0 && c.emoji.name == '◀️') {
                i--
                respuesta = await akinator.atras()
            }
            else {
                respuesta = emojis.slice(0, 5).indexOf(c.emoji.name)
                console.log(respuesta)
                respuesta = await akinator.siguiente(respuesta)
                i++
            }

            if (!respuesta) return;

            if (akinator.progreso >= 95) {
                message.guild.terminado = true
                return colector.stop();
            }
            msg.edit(msg.embeds[0].setAuthor(respuesta.pregunta + " progreso: " + akinator.progreso + "%").setColor(color(akinator.progreso)))

        })
        colector.on('end', async () => {
            if (!message.guild.terminado) {
                delete message.guild.terminado
                return delete message.guild.aki;
            }
            delete message.guild.aki
            if (!message.guild.stoped) {
                let resultados = await akinator.respuestas();
                let embed = new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setDescription('\u200b' + resultados[0].descripcion)
                    .setAuthor('Piensas en ' + resultados[0].nombre)
                    .setImage(resultados[0].foto)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                return message.channel.send({ embed: embed })
            }
            else {
                embedResponse('Has parado de jugar.')
            }
            delete message.guild.stoped
        })
    }
};
function color(p) {
    if (p <= 5) return '#FF0000';
    else if (p <= 10) return '#ff2b00';
    else if (p <= 20) return '#ff8000';
    else if (p <= 30) return '#ffaa00';
    else if (p <= 40) return '#ffd500';
    else if (p <= 50) return '#aaff00';
    else if (p <= 60) return '#80ff00';
    else if (p <= 70) return '#55ff00';
    else if (p <= 80) return '#2bff00';
    else if (p <= 90) return '#00ff00';
    return 'GREEN';
}
/*
function color(p) {
    if (p <= 5) return '#FF0000'
    else if (p <= 10) return '#ff2e2e';
    else if (p <= 20) return '#ff5454';
    else if (p <= 30) return '#ff7d7d';
    else if (p <= 40) return '#ff3e3b';
    else if (p <= 50) return '#cc4f4e';
    else if (p <= 60) return '#70c41b';
    else if (p <= 70) return '#6dd404';
    else if (p <= 80) return '#62ff00';
    else if (p <= 90) return '#2fff00';
    return 'GREEN';
}
*/
