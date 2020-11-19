const Discord = require("discord.js")

module.exports = {
    config: {
        name: "eval",
        alias: ['e'],
        description: "eval a code",
        usage: "z!eval return 1+1",
        category: 'developer'
    },
    // eslint-disable-next-line no-unused-vars
    run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!["507367752391196682", "538421122920742942", '374710341868847104', '686766483350880351'].includes(message.author.id))
            return embedResponse('No puedes usar este comando!')
        //let limit = 1950;
        try {
            let code = args.join(" ");
            let evalued = await eval(`(async() => {${code}})()`);
            let asd = typeof (evalued)
            evalued = require("util").inspect(evalued, { showHidden: true, depth: 0 });
            let txt = "" + evalued;
            let limit = 1999
            if (txt.length > limit) {
                embedResponse('Evaluación mayor a 1999 caracteres! Enviando a la consola');
                console.log(`El contenido a evaluar es mayor a 1999 caracteres y se ha enviado a la consola. \n Entrada: \n ${code} \n \n Salida: \n ${evalued} \n \n Tipo: \n ${asd} \n \n`)
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`Eval`)
                .addField(`Entrada`, `\`\`\`js\n${code}\`\`\``)
                .addField(`Salida`, `\`\`\`js\n${evalued}\n\`\`\``.replace(client.token, "Contenido privado"))
                .addField(`Tipo`, `\`\`\`js\n${asd}\`\`\``.replace("number", "Number").replace("object", "Object").replace("string", "String").replace(undefined, "Undefined").replace("boolean", "Boolean").replace("function", "Function"))
                .setColor(client.color)
                .setTimestamp()
            message.channel.send({ embed: embed })
        } catch (err) {
            message.channel.send(err, { code: 'js' })
        }
    }
}
