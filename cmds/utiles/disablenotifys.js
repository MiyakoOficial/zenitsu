module.exports = {
    config: {
        name: "disablenotifys", //nombre del cmd
        alias: [], //Alias
        description: "Desactiva las notificaciones de subida de nivel", //Descripción (OPCIONAL)
        usage: "z!disablenotifys",
        category: 'utiles',
        botPermissions: [],
        memberPermissions: []
    },
    run: async({ client, message, args }) => {
    let cosoactualxddd = client.getData({idMember: message.author.id, idGuild: message.guild.id}, 'niveles')
    let eritruofals = cosoactualxddd.disableNotify ? false : true
    let quetengoqueresponder = !eritruofals ? 'Desactivaste las notificaciones' : 'Activaste las notificaciones'
    await client.updateData({idMember: message.author.id, idGuild: message.guild.id}, {$set: { disableNotify: eritruofals} }, 'niveles')
    message.channel.send(quetengoqueresponder)
    }
};
