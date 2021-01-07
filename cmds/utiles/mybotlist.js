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

        if (!args[0]) return embedResponse('<a:CatLoad:724324015275245568> | ¿Acerca de cual bot quieres obtener informacion?');

        let { data } = await mybo.mybotlist(args[0]);

        if (data.message)
            return embedResponse('<:cancel:779536630041280522> | ' + data.message)

        let res = `== INFO BOT ==\n[Detalles BOT]\n\nID: ${data.bot.id}\nPREFIX: ${data.bot.prefix}\nINFO: ${data.bot.descripcion}\n${data.bot.nombre}\n\n[Detalles USER]\nID: ${data.owner.id}\nTAG: ${data.owner.tag}`

        message.channel.send(res, { code: 'asciidoc' }).catch(() => { });
    }
};