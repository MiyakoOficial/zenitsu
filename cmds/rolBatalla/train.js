const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    config: {
        name: "train",//Nombre del cmd
        alias: [], //Alias
        description: "Entrenar", //Descripción (OPCIONAL)
        usage: "z!train",
        category: 'rol'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let data = await client.getData({ id: message.author.id }, 'demonios');
        let { cooldown, xpusuario, nivelespada } = data;

        let elcoso = Math.floor(nivelespada / 10);
        let multiplica = []

        for (var i = 0; elcoso > 0; i++) {
            multiplica.push('n')
            elcoso--
        }

        let reto = (multiplica.length * 15) + 50

        let levelup = Math.floor(Math.random() * 7) + 1;

        if (cooldown > Date.now())
            return embedResponse('No puedo ir a entrenar ahora.\n\nTiempo restante: ' + require('ms')(cooldown - Date.now()))

        else {

            let embed1 = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription('Entrenando ⚔️!')
                .setTimestamp()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail('https://media1.tenor.com/images/e83dcba6a3454dd6410d555cf66b6f3d/tenor.gif?itemid=15043714')

            await client.updateData({ id: message.author.id }, { cooldown: Date.now() + require('ms')('30s') }, 'demonios');

            message.channel.send({ embed: embed1 }).catch(e => { })

            await Discord.Util.delayFor(5000);

            if (xpusuario + levelup < reto) {

                let datazo = await client.updateData({ id: message.author.id }, { $inc: { xpusuario: levelup } }, 'demonios')

                let embed2 = new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setDescription(`Subiste ${levelup} de experiencia!\n\n${datazo.xpusuario}/${reto} para el nivel ${parseInt(datazo.nivelusuario) + 1}`)
                    .setTimestamp()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setThumbnail('https://media1.tenor.com/images/ff57d6cb909d69f9c6f7b2ff590f1f19/tenor.gif?itemid=15100391')

                return message.channel.send({ embed: embed2 }).catch(e => { })
            }

            else {

                await client.updateData({ id: message.author.id }, { $inc: { nivelusuario: 1, nivelespada: 1 } }, 'demonios')
                let dataz = await client.updateData({ id: message.author.id }, { xpusuario: 0 }, 'demonios');

                let embed3 = new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setDescription('Subiste al nivel ' + dataz.nivelusuario + '!')
                    .setTimestamp()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setThumbnail('https://media1.tenor.com/images/c0011b22ef40718152484c7e11fd4b6d/tenor.gif?itemid=14677284')

                return message.channel.send({ embed: embed3 }).catch(e => { })

            }
        }
    }
}