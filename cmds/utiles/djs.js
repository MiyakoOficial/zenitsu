const fetch = require('node-fetch');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "djs"
        this.category = 'utiles'
    }
    async run({ message, args, embedResponse }) {

        if (!args[0]) return embedResponse('<a:CatLoad:724324015275245568> | ¿Que quieres buscar?');
        let response = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`).catch(() => { });
        if (!response) return embedResponse('Sin resultados.');
        let megadb = await response.json().catch(() => { });
        if (!megadb) return embedResponse("<:cancel:779536630041280522> | No pude encontrarlo en la documentacion de discord.js.")
        message.channel.send({ embed: megadb }).catch(() => { });

    }
};