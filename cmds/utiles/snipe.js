const Discord = require('discord.js');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "snipe"
        this.category = 'utiles'
    }
    async run({ client, message, embedResponse }) {

        let canal = message.mentions.channels.first() || message.channel;

        let data = (await client.getData({ id: canal.id }, 'snipe'))

        if (!data || !data.mensaje) return embedResponse("<:cancel:779536630041280522> | No he visto ningun mensaje borrarse en este canal.")

        let embed = new Discord.MessageEmbed()
            .setDescription(data.mensaje)
            .setAuthor(data.nombre, data.avatarURL)
            .setColor(client.color)
            .setTimestamp()
            .setThumbnail('https://media1.tenor.com/images/8c3e8a0a3c7b0afc22624c9278be6a89/tenor.gif?itemid=5489827')
        return message.channel.send({ embed: embed }).catch(() => { })

    }
}
