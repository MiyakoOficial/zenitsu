module.exports = {
    config: {
        name: "setchannelxp", //nombre del cmd
        alias: [], //Alias
        description: "Establecer el canal de niveles", //Descripción (OPCIONAL)
        usage: "z!setchannelxp #mencion",
        category: 'niveles'

    }, run: async ({ client, message, embedResponse }) => {

        if (!message.member.hasPermission("ADMINISTRATOR")) return embedResponse("No tienes el permiso `ADMINISTRATOR`")
        let channel = message.mentions.channels.first();
        if (!channel) return embedResponse("No has mencionado un canal/Ese canal no existe.")
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(channel.id)) return embedResponse('El canal tiene que ser del servidor donde estas!')
        await client.updateData({ id: message.guild.id }, { canal: channel.id }, 'logslevel')
        return embedResponse(`Canal establecido en: <#${channel.id}>`)

    }
}