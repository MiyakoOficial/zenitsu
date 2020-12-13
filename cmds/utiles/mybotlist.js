const mybo = require("myscrapper");

module.exports = {
    config: {
        name: "mybotlist", //nombre del cmd
        alias: [`mybotlist`, `ml`, `mbl`], //Alias
        description: "Ver informacion de los bots de portalmybot.com/mybotlist", //Descripción (OPCIONAL)
        usage: "z!mybotlist ID",
        category: 'utiles',
        botPermissions: [],
        memberPermissions: []
    },
    run: async ({ message, args, embedResponse }) => {

        if (!args[0]) return embedResponse('Acerca de cual bot quieres obtener informacion?');

        let { data } = await mybo.mybotlist(args[0]);

        if (data.message)
            return embedResponse(data.message)

        let res = `== INFO BOT ==
        [Detalles BOT]
        ID: ${data.bot.id}
        PREFIX: ${data.bot.prefix}
        INFO: ${data.bot.descripcion}
        ${data.bot.nombre}
        
        [Detalles USER]
        ID: ${data.owner.id}
        TAG: ${data.owner.tag}`

        message.channel.send(res, { code: 'asciidoc' }).catch(() => { });
    }
};