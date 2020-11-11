const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
let cooldownC = new Set()
module.exports = {
    config: {
        name: "virus", //Nombre del cmd
        alias: [], //Alias
        description: "Ver que tan dañino es un archivo", //Descripción (OPCIONAL)
        usage: "z!virus link (tambien puedes adjuntar un archivo)",
        category: 'utiles'
    },
    run: async ({ client, message, embedResponse, args }) => {

        let url = message.attachments.map(a => a)[0]?.proxyURL || args[0]

        if (cooldownC.has(message.author.id)) { return embedResponse('Aun se esta escaneando un archivo.') }

        if (!(`${url}`.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi)) || !(await fetch(url).catch(() => { })) || (await fetch(url).status == 404))
            return embedResponse('URL invalido.')

        embedResponse(`Escaneando: ${url}`);

        cooldownC.add(message.author.id)

        let res = await scan(url);

        let embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`Resultado:\n${res.message}`)
            .setFooter(`Link: ${res.url}`)
            .setTimestamp()
        cooldownC.delete(message.author.id)
        message.channel.send({ embed: embed }).catch(() => { })

    }
}

async function scan(url) {

    const virustotal = require('virustotal.js');

    virustotal.setKey(process.env.APIKEYVIRUS);

    let check = await require("util").promisify(virustotal.scanUrl)(url).catch(() => { })

    if (!check)
        return await scan(url)

    let res = await require("util").promisify(virustotal.getUrlReport)(url).catch(() => { })

    if (!res || (res?.total <= 1))
        return await scan(url)

    else {
        //console.log(res)
        return { message: `Positives: ${res.positives}\nScans: ${res.total}`, url: url }
    }

}