const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "setmessageid",//Nombre del cmd
        alias: [], //Alias
        description: "Estable un mensaje por us ID para hacer muteall/unmuteall con reacciones", //Descripción (OPCIONAL)
        usage: "z!setmessageid ID_MESSAGE #mencion(opcional)",
        category: 'among us'
    }, run: async ({ client, message, args, embedResponse }) => {

        let rol = message.guild.roles.cache.find(a => a.name === 'Among Us manager');
        if (!rol || !message.member.roles.cache.has(rol.id)) return embedResponse('Tienes que tener el rol `Among Us manager`')
        if (!args[0]) return embedResponse('Ponga una ID valida de mensaje!');
        let canal = message.mentions.channels.first() || message.channel
        if (messageSS(args[0], canal) === false) return embedResponse('No encontre el mensaje!\nUse: ' + prefix + 'setmessageid <id> <#mencion>')
        await client.updateData({ id: message.guild.id }, { idMessage: args[0] }, 'muteid');
        canal.messages.fetch(args[0]).then(async (a) => {
            await a.react('751908729930121376')
            await a.react('751908729624068226')
        })
        return embedResponse('Establecido en: <#' + canal.id + '>');

    }
}

async function messageSS(id, canal) {
    return new Promise((resolve, reject) => {
        canal.messages.fetch(id, true)
            .then(() => {
                return resolve(true);
            })
            .catch(() => {
                return resolve(false);
            })
    })
}