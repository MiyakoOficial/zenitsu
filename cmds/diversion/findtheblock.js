const { Util, MessageEmbed } = require("discord.js")

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "findtheblock"
        this.category = 'diversion'
        this.cooldown = 25
    }

    /**
     * 
     * @param {Object} object
     * @param {import('discord.js').Message} object.message
     * @param {Array<String>} object.args
     */

    async run(object) {

        const { message, embedResponse } = object

        /**@type {Array<Array<String>>} */
        let tablero = [],
            tableroString = ``,
            emojis = [`🟥`, `🟨`, `🟦`, `🟩`, `🟫`, `⬛`, `🟪`, `🟧`],
            emojisColores = {
                [`🟥`]: '#ff0000',
                [`🟨`]: '#ebe834',
                [`🟦`]: '#3499eb',
                [`🟩`]: '#34eb40',
                [`🟫`]: '#733b00',
                [`⬛`]: '#000000',
                [`🟪`]: '#9d00ff',
                [`🟧`]: '#ff9d00'
            },
            obj = {},
            numeritos = [
                `1️⃣`,
                `2️⃣`,
                `3️⃣`,
                `4️⃣`,
                `5️⃣`,
                `6️⃣`,
                `7️⃣`,
                `8️⃣`,
                `9️⃣`
            ],
            posibles = [];

        for (let x = 0; x < 8; x++) {

            let temp = [];

            for (let y = 0; y < 8; y++) {

                const emoji = emojis[Math.floor(Math.random() * emojis.length)],
                    posibilidad = Math.floor(Math.random() * 4) + 1;

                if (obj[emoji]) {
                    temp.push(`⬜`);
                    continue;
                }

                else if (posibilidad > 3) {
                    temp.push(emoji);
                    obj[emoji] = true;
                    posibles.push(emoji)
                    continue;
                }

                temp.push(`⬜`);
            }

            tablero.push(temp)
            temp = [];

        }

        tableroString = tablero.flatMap((item) => item).map((item, i) => {
            return !((i + 1) % 8) ? `${item}\n` : item
        }).join('')

        tableroString = tableroString.split('\n').slice(0, tableroString.split('\n').length - 1).map((item, i) => {
            return `${numeritos[i]}${item}`;
        }).join('\n');

        tableroString += `\n🔳1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣`;

        const game = { tableroString, tablero, emoji: posibles[Math.floor(Math.random() * posibles.length)] };

        message.author.juego = game;

        const msg = await message.channel.send({ embed: { description: tableroString } })

        await Util.delayFor(5000);

        let i = 0,
            res = [];

        for (let x of tablero) {
            // eslint-disable-next-line no-unused-vars
            for (let _y of x) {
                res.push(!((i + 1) % 8) ? `⬜\n` : `⬜`)
                i++
            }
        }

        res = res.join('');

        res = res.split('\n').slice(0, tableroString.split('\n').length - 1).map((item, i) => {
            return `${numeritos[i]}${item}`;
        }).join('\n');

        res += `\n🔳1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣`;

        let embed = new MessageEmbed()
            .setColor(emojisColores[message.author.juego.emoji])
            .setDescription(res)
            .setTimestamp()
            .setFooter(`¿En que posición está ${message.author.juego.emoji}? (15 segundos)`)

        await msg.edit({ embed })

        const resMessage = await message.channel.awaitMessages(msg => msg.content && msg.author.id == message.author.id, { max: 1, time: 150000 }).catch(() => { });

        if (!resMessage?.size)
            return message.channel.send('<:cancel:804368628861763664> | No respondiste a tiempo...');

        const awaitMessage = resMessage.first();

        const splited = awaitMessage.content.split(' ') || [],
            unoxd = tablero[parseInt(splited[1]) - 1];

        if (unoxd) {

            let dosxd = unoxd[parseInt(splited[0]) - 1]

            if (dosxd == game.emoji) {
                return embedResponse('<a:waiting:804396292793040987> | Ganaste!')
            }

            else {
                return embedResponse('<:wearymonke:816652946418827284> | Perdiste ...')
            }

        }

        else {
            return embedResponse('<:wearymonke:816652946418827284> | Perdiste ...')
        }

    }
}