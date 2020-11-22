const Discord = require("discord.js")

module.exports = {
    config: {
        name: "invite",
        alias: [],
        description: "invitar al bot",
        usage: "z!invite",
        category: 'bot'
    },
    run: ({ client, message }) => {
        let link = 'https://discordapp.com/oauth2/authorize?client_id=721080193678311554&scope=bot&permissions=2146958847';
        let invitacionLink = 'https://discord.gg/hbSahh8';
        let embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
            .setDescription(`Link de invitación del bot: [Link](${link} "Invitaras al bot")🤖\nLink de invitación al servidor de soporte: [Link](${invitacionLink} "Recibiras ayuda")<:zStaffZenitsu:766436216966217729>`)
            .setColor(client.color)
            .setFooter('Gracias por apoyar!', message.author.displayAvatarURL({ format: 'png', size: 2048 }))
            .setTimestamp()
        return message.channel.send({ embed: embed })
    }
}