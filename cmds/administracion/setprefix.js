const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "setprefix",//Nombre del cmd
        alias: [], //Alias
        description: "Establecer el nuevo prefix", //Descripción (OPCIONAL)
        usage: "z!setprefix prefix",
        category: 'administracion'
    }, run: async ({ client, message, args, embedResponse }) => {

        if (!message.member.hasPermission("ADMINISTRATOR")) return embedResponse("No tienes el permiso `ADMINISTRATOR`")
        if (!args[0] || args[0].length >= 4) return embedResponse('El prefix debe tener menos de 3 caracteres!')

        await client.updateData({ id: message.guild.id }, { prefix: args[0] }, 'prefix').catch(e => { });

        return embedResponse(`Prefix establecido a \`${args[0]}\``)
    }
}