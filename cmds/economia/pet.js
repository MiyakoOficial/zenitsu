// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js'),
    economy_model = require('../../models/economy'),
    icon_money = `<:monedaZenitsu:808837174031024208>`,
    { checkEconomy, sendEmbed } = require('../../Utils/Functions')

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = 'pet'
        this.category = 'economy'
    }

    /**
     * @param {Object} obj
     * @param {Discord.Message} obj.message
     * @param {Discord.Client} obj.client
     * @param {Array<String>} obj.args 
     * @param {Function} obj.embedResponse
     */

    async run(obj) {


        const { message, args } = obj;

        const { money } = await checkEconomy(message);

        const name = args.slice(1).join(' '),
            caso = args[0];

        switch (caso) {
            case 'rename':

                if (money < 100)
                    return sendEmbed({
                        channel: message.channel,
                        description: `<:cancel:804368628861763664> | Necesitas tener **100**${icon_money}.`
                    })

                if (name.length >= 100)
                    return sendEmbed({
                        channel: message.channel,
                        description: `<:cancel:804368628861763664> | El nombre debe tener menos de 100 caracteres.`
                    })

                // eslint-disable-next-line no-case-declarations
                const { pet } = await economy_model.findOneAndUpdate({ id: message.author.id }, { $set: { 'pet.name': name }, $inc: { money: -100 } }, { new: true })

                return sendEmbed({
                    channel: message.channel,
                    description: `<:accept:804368642913206313> | Ahora tu mascota se llama ${pet.name}`
                })

            default:

                return sendEmbed({
                    channel: message.channel,
                    description: `<:angery:804368531415629875> | Por ahora solo puedes renombrar a tu mascota, z!pet rename Awooooooo.`
                })
        }
    }
};