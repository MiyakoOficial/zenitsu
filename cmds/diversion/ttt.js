/* eslint-disable no-unused-vars */
const { sendEmbed, mapaCanvas, awaitMessage } = require('../../Utils/Functions')
const tresenraya = require('tresenraya');
const { Message, MessageAttachment } = require('discord.js');
const { Client } = require('discord.js');

module.exports = {
    config: {
        name: "ttt", //Nombre del cmd
        alias: ['tresenraya'], //Alias
        description: "Jugar tresenraya con un amigo.", //Descripción (OPCIONAL)
        usage: "z!ttt @mencion",
        category: 'utiles'
    },
    /**
     * @param {Object} obj
     * @param {Message} obj.message
     * @param {Client} obj.client
     */
    run: async (obj) => {

        const { message, client } = obj;

        let usuario = message.mentions.members.first()

        if (!usuario || usuario.id == message.author.id || usuario.user.bot) return sendEmbed({
            channel: message.channel,
            description: `<:cancel:779536630041280522> | Menciona a un miembro del servidor para jugar.`
        })
        usuario = usuario.user
        if (message.guild.partida)
            return sendEmbed({ channel: message.channel, description: ':x: | Hay otra persona jugando en este servidor!' })

        sendEmbed({
            channel: message.channel,
            description: `<a:amongushappy:798373703880278016> | ${usuario} tienes 1 minuto para responder...\n¿Quieres jugar?: ~~responde "s"~~\n¿No quieres?: ~~responde "n"~~`
        });

        let respuesta = await awaitMessage({ channel: message.channel, filter: (m) => m.author.id == usuario.id && ['s', 'n'].some(item => item == m.content), time: (1 * 60) * 1000, max: 1 }).catch(() => { })

        if (!respuesta) {
            sendEmbed({
                channel: message.channel,
                description: `😔 | ${usuario} no respondió...`
            })
            return message.guild.partida == undefined;
        }

        if (respuesta.first().content == 'n') {
            sendEmbed({
                channel: message.channel,
                description: '😔 | Rechazó la invitación...'
            })
            return message.guild.partida == undefined;
        }

        message.guild.partida = message.guild.partida ? message.guild.partida : new tresenraya.partida({ jugadores: [message.author.id, usuario.id] });

        const { partida } = message.guild;

        partida.on('ganador', async (jugador, tablero, paso) => {
            message.guild.partida = undefined;
            return sendEmbed({
                channel: message.channel,
                description: `<:zsUHHHHHH:649036589195853836> | ¡Ha ganado ${client.users.cache.get(jugador).username}!\n\n${tablero.string}`,
                attachFiles: new MessageAttachment(await mapaCanvas(tablero.array, true), 'tictactoe.gif'),
                imageURL: 'attachment://tictactoe.gif'
            });
        });

        partida.on('empate', async (jugadores, tablero, paso) => {
            message.guild.partida = undefined;
            return sendEmbed({
                channel: message.channel,
                description: `<:wtfDuddd:797933539454091305> | Un empate entre ${jugadores.map(user => client.users.cache.get(user).username).join(' y ')}!\n\n${tablero.string}`,
                attachFiles: new MessageAttachment(await mapaCanvas(tablero.array), 'tictactoe.gif'),
                imageURL: 'attachment://tictactoe.gif'
            });

        });

        partida.on('finalizado', async (jugadores, tablero, paso) => {
            message.guild.partida = undefined;
            return sendEmbed({
                channel: message.channel,
                description: `<:wtfDuddd:797933539454091305> | Tiempo excedido!\n\n${tablero.string}`,
                attachFiles: new MessageAttachment(await mapaCanvas(tablero.array), 'tictactoe.gif'),
                imageURL: 'attachment://tictactoe.gif'
            });
        })

        await sendEmbed({
            description: `🤔 | Empieza ${client.users.cache.get(partida.turno.jugador).username}, elige un número del 1 al 9 [\`${partida.turno.ficha}\`]\n\n${partida.tablero.string}`,
            channel: message.channel,
            attachFiles: new MessageAttachment(await mapaCanvas(partida.tablero.array), 'tictactoe.gif'),
            imageURL: 'attachment://tictactoe.gif'
        });

        const colector = message.channel.createMessageCollector(msg => msg.author.id === partida.turno.jugador && !isNaN(msg.content) && (Number(msg.content) >= 1 && Number(msg.content) <= 9) && partida.disponible(msg.content) && !partida.finalizado, { time: (10 * 60) * 1000 });
        colector.on('collect', async (msg) => {
            partida.elegir(msg.content);
            if (partida.finalizado) {
                colector.stop();
                delete message.numero;
                return;
            }
            return await sendEmbed({
                channel: msg.channel,
                description: `😆 | Turno de ${client.users.cache.get(partida.turno.jugador).username} [\`${partida.turno.ficha}\`]\n\n ${partida.tablero.string}`,
                attachFiles: new MessageAttachment(await mapaCanvas(partida.tablero.array), 'tictactoe.gif'),
                imageURL: 'attachment://tictactoe.gif'
            })

        });
        colector.on('end', () => partida.finalizado ? null : partida.emit('finalizado', partida.jugadores, partida.tablero, partida.paso))
        return true;
    }
}