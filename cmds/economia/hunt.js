const culdaun = new Map()
function checkCooldown(message) {

    if (culdaun.has(message.author.id) && Date.now() <= culdaun.get(message.author.id))
        return culdaun;

    if (!culdaun.has(message.author.id)) {
        culdaun.set(message.author.id, Date.now() + require("ms")('2m'))
        setTimeout(() => {
            culdaun.delete(message.author.id)
        }, require('ms')('1m'))
        return false;
    }

}

const economy_model = require('../../models/economy'),
    { generarNumero, checkEconomy, sendEmbed } = require('../../Utils/Functions')

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "hunt"
        this.category = 'economy'
        this.cooldown = 0;
    }

    /**
     * @param {Object} obj
     * @param {Discord.Message} obj.message
     * @param {Discord.Client} obj.client
     * @param {Array<String>} obj.args 
     * @param {Function} obj.embedResponse
     */

    async run(obj) {

        const { message, embedResponse } = obj;

        let cooldown = checkCooldown(message);

        if (cooldown)
            return embedResponse(`<a:waiting:804396292793040987> | Espera ${(cooldown.get(message.author.id) - Date.now()) / 1000}s para volver a cazar.`)

        const { items } = await checkEconomy(message);

        if (!items.includes('gun'))
            return embedResponse('<:cancel:804368628861763664> | No tienes una pistola.');

        let chance = generarNumero(0, 100)

        if (chance < 40) {

            return sendEmbed({
                channel: message.channel,
                description: `<:cancel:804368628861763664> | El animal se ha escapado, suerte en la proxima.`
            })

        }

        const data = await economy_model.findOneAndUpdate({ id: message.author.id }, { $inc: { food: 1 } }, { new: true })

        return sendEmbed({
            channel: message.channel,
            description: `<:accept:804368642913206313> | Ahora tienes **${data.food}** de comida.`
        })

    }
};