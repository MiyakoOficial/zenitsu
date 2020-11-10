const VirusTotalApi = require('virustotal-api');
const virustotal = new VirusTotalApi(process.env.APIKEYVIRUS);
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    config: {
        name: "test", //Nombre del cmd
        alias: [], //Alias
        description: "Ver que tan dañino es un archivo", //Descripción (OPCIONAL)
        usage: "z!virus link (tambien puedes adjuntar un archivo)",
        category: 'utiles'
    },
    run: async ({ client, message, embedResponse, args }) => {

        if (message.author.id != '507367752391196682')
            return;

        let virus;
        let report;
        let archivo = message.attachments.map(a => a)[0]
        if (archivo) {
            embedResponse(`Escaneando: ${archivo.name}`);
            virus = await virustotal.fileScan(archivo)
            report = await virustotal.urlReport(virus.resource)
        }
        else if (args[0]) {
            embedResponse(`Escaneando: ${args[0]}`)
            virus = await virustotal.urlScan(args[0]);
            report = await virustotal.urlReport(virus.resource);
        }

        console.log(report)
        embedResponse(`${report.total}, ${report.positives}`)
        /*let embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`Resultado:\n${res.message}`)
            .setFooter(`Link: ${res.url}`)
            .setTimestamp()
        cooldownC.delete(message.author.id)
        message.channel.send({ embed: embed }).catch(() => { })*/

    }
}