const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "setlogs",//Nombre del cmd
        alias: [], //Alias
        description: "Establecer el canal de logs", //Descripción (OPCIONAL)
        usage: "z!setlogs #canal",
        category: 'administracion'
    },
    run: async ({ client, message, args, embedResponse }) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return embedResponse("No tienes el permiso `ADMINISTRATOR`")
        let channel = message.mentions.channels.first();
        if (!channel) return embedResponse("No has mencionado un canal/Ese canal no existe.")
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(channel.id)) return embedResponse('El canal tiene que ser del Servidor donde estas!')

        await client.updateData({ id: message.guild.id }, { channellogs: channel.id }, 'logs')

        return embedResponse(`Canal establecido en: <#${channel.id}>`)
    }
}