//Después de Alias es opcional.
module.exports = {
    config: {
        name: "setmessageid", //nombre del cmd
        alias: [], //Alias
        description: "Estable un mensaje por us ID para hacer muteall/unmuteall con reacciones", //Descripción (OPCIONAL)
        usage: "z!setmessageid ID_MESSAGE #mencion(opcional)",
        category: 'among us',
        botPermissions: ['MANAGE_MESSAGES'],
        memberPermissions: []
    }, run: async ({ client, message, args, embedResponse }) => {

        let rol = message.guild.roles.cache.find(a => a.name === 'Among Us manager');
        if (!rol || !message.member.roles.cache.has(rol.id)) return embedResponse('<:cancel:779536630041280522> | Tienes que tener el rol `Among Us manager`')
        if (!args[0]) return embedResponse('<:cancel:779536630041280522> | Ponga una ID valida de mensaje.');
        let canal = message.mentions.channels.first() || message.channel
        if (await messageSS(args[0], canal) === false) return embedResponse('<:cancel:779536630041280522> | No encontre el mensaje!\nPuedes buscar el mensaje mencionando el canal donde esta. z!setmessageid <id> <#mencion>')
        if (!canal.permissionsFor(client.user).has('MANAGE_MESSAGES'))
            return embedResponse('<:cancel:779536630041280522> | Necesito el permiso `MANAGE_MESSAGES` en el canal ' + canal.toString())
        await client.updateData({ id: message.guild.id }, { idMessage: args[0] }, 'muteid');
        canal.messages.fetch(args[0]).then(async (a) => {
            await a.react('751908729930121376')
            await a.react('751908729624068226')
        })
        return embedResponse('<:member:779536579966271488> | ' + message.author.username + ' establecio el mensaje en: <#' + canal.id + '>');

    }
}

function messageSS(id, canal) {
    return new Promise((resolve) => {
        canal.messages.fetch(id, true)
            .then(() => {
                return resolve(true);
            })
            .catch(() => {
                return resolve(false);
            })
    })
}