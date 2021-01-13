const { sendEmbed } = require("../../Utils/Functions");

module.exports = {
    config: {
        name: "togglenotifys", //nombre del cmd
        alias: [], //Alias
        description: "Desactiva/Activa las notificaciones de subida de nivel", //Descripción (OPCIONAL)
        usage: "z!togglenotifys",
        category: 'niveles',
        botPermissions: [],
        memberPermissions: []
    },
    run: async ({ client, message }) => {
        let cosoactualxddd = await client.getData({ idMember: message.author.id, idGuild: message.guild.id }, 'niveles')
        let eritruofals = cosoactualxddd.disableNotify ? false : true
        let quetengoqueresponder = !eritruofals ? '<:cancel:779536630041280522> | Se han desactivado las notificaciones' : '<:accept:779536642365063189> | Se han activado las notificaciones'
        await client.updateData({ idMember: message.author.id, idGuild: message.guild.id }, { $set: { disableNotify: eritruofals } }, 'niveles')
        return sendEmbed({
            channel: message.channel,
            description: quetengoqueresponder
        });
    }
};
