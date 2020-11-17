const Discord = require('discord.js');
module.exports = {
    config: {
        name: "akinator", //Nombre del cmd
        alias: [], //Alias
        description: "Ver el ultimo mensaje borrado", //Descripción (OPCIONAL)
        usage: "z!akinator",
        category: 'utiles'
    },
    run: async ({ message, embedResponse, client }) => {
        let i = 0;

        if (message.guild.aki)
            return embedResponse('Alguien esta jugando.')
        else {
            message.guild.aki = true;
        }
        message.channel.send('🤔')
        const mech_aki = require("mech-aki");
        let akinator = new mech_aki("es");
        let colector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id);
        let respuesta = await akinator.empezar();
        let msg = await message.channel.send({
            embed: new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`Opciones validas:\n1- Si\n2- No\n3- No lo se\n4- Probablemente\n5- Probablamente no`)
                .setAuthor(respuesta.pregunta)
                .setFooter('Puedes parar con escribiendo "stop" o "back" para retroceder.')
        })

        colector.on('collect', async (c) => {

            if (c.content == 'stop') {
                message.guild.stoped = true
                return colector.stop();
            }

            let respuesta;

            c.delete({ timeout: 1000 }).catch(() => { })

            if (i != 0 && c.content == 'back') {
                i--
                respuesta = await akinator.atras()
            }
            else if (parseInt(c.content) && parseInt(c.content) <= 5) {
                respuesta = parseInt(c.content) - 1
                respuesta = await akinator.siguiente(respuesta)
                i++
            }

            if (!respuesta) return;

            if (akinator.progreso >= 95) return colector.stop();
            msg.edit(msg.embeds[0].setAuthor(respuesta.pregunta + " progreso: " + akinator.progreso + "%").setColor(color(akinator.progreso)))
        })
        colector.on('end', async () => {
            delete message.guild.aki;
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