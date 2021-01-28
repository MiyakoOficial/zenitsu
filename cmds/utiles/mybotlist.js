const mybo = require("myscrapper");

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "mybotlist"
        this.alias = [`mybotlist`, `ml`, `mbl`]
        this.category = 'utiles'
    }
    async run({ message, args, embedResponse }) {

        if (!args[0]) return embedResponse('<a:CatLoad:804368444526297109> | ¿Acerca de cual bot quieres obtener informacion?');

        let { data } = await mybo.mybotlist(args[0]);

        if (data.message)
            return embedResponse('<:cancel:804368628861763664> | ' + data.message)

        let res = `== INFO BOT ==\n\n[Detalles BOT]\nID: ${data.bot.id}\nPREFIX: ${data.bot.prefix}\nINFO: ${data.bot.descripcion}\n${data.bot.nombre}\n\n[Detalles USER]\nID: ${data.owner.id}\nTAG: ${data.owner.tag}`

        message.channel.send(res, { code: 'asciidoc' }).catch(() => { });
    }
};