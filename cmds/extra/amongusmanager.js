// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Message, Client } = require("discord.js");
const model = require('../../models/amongus')

const Command = require('../../Utils/Classes').Command;
module.exports = module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "amongusmanager"
        this.alias = [];
        this.cooldown = 10
        this.category = 'extra';
        this.botPermissions.channel = ['MANAGE_MESSAGES', 'ADD_REACTIONS']
    }

    /**
     * 
     * @param {Object} obj
     * @param {Message} obj.message
     * @param {Client} obj.client
     */

    run(obj) {
        const { message } = obj;
        if (!message.member.roles.cache.find(item => item.name == 'Among Us Manager'))
            return message.channel.send({
                embed:
                    new MessageEmbed()
                        .setDescription('<:cancel:804368628861763664> | Necesitas tener el rol `Among Us Manager`.')
                        .setColor(message.client.color)
                        .setTimestamp()
            })
        let embed = new MessageEmbed()
            .setTimestamp()
            .setAuthor('Among Us Manager', `https://media.discordapp.net/attachments/803346384144433154/807737161457074257/O7MCJDNJHNERXCKFSC6TGNNE3E.png`)
            .setColor('#4ceb34')
            .setDescription('Reacciona con <:MUTE:807729858649391105> para mutear.\n' +
                'Reacciona con <:UNMUTE:807729857693876224> para desmutear.\n\n' +
                '`Requisitos:`\n\n' +
                'El servidor necesita tener un rol llamado `Among Us Manager`.\n' +
                'El miembro que reacciona necesita tener ese rol.\n' +
                'Necesitas estar en un canal que tenga en el nombre `Among Us`, (ejemplo: 🔪**Among Us**🔪).\n' +
                'El bot necesita tener los permisos de **mutear a los miembros** en el canal de voz y **administrar** ese canal.'
            )

        return message.channel.send({ embed })
            .then(async msg => {
                await msg.react('807729858649391105')
                await msg.react('807729857693876224')
                let data = await model.findOneAndUpdate({ idGuild: message.guild.id }, { idMessage: msg.id });
                if (!data) return await model.create({ idGuild: message.guild.id, idMessage: msg.id })
            })
    }
}