const { sendEmbed } = require("../../Utils/Functions");

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "togglenotifys"
        this.category = 'niveles'
    }
    async run({ client, message }) {
        let cosoactualxddd = await client.getData({ idMember: message.author.id, idGuild: message.guild.id }, 'niveles')
        let eritruofals = cosoactualxddd.disableNotify ? false : true
        let quetengoqueresponder = !eritruofals ? '<:cancel:804368628861763664> | Se han desactivado las notificaciones' : '<:accept:804368642913206313> | Se han activado las notificaciones'
        await client.updateData({ idMember: message.author.id, idGuild: message.guild.id }, { $set: { disableNotify: eritruofals } }, 'niveles')
        return sendEmbed({
            channel: message.channel,
            description: quetengoqueresponder
        });
    }
};
