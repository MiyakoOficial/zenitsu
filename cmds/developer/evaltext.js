const Discord = require("discord.js")

module.exports = {
    config: {
        name: "evaltxt",
        alias: ['etxt'],
        description: "eval a code",
        usage: "z!evaltxt return 1+1",
        category: 'developer',
        botPermissions: [],
        memberPermissions: []

    },
    // eslint-disable-next-line no-unused-vars
    run: async ({ client, message, args, embedResponse, Hora }) => {


        if (!client.devseval.includes(message.author.id))
            return embedResponse('No puedes usar este comando!')
        try {
            let code = args.join(" ");
            let evalued = await eval(`(async() => {${code}})()`);
            let asd = typeof (evalued)
            evalued = require("util").inspect(evalued, { showHidden: true });
            let att = new Discord.MessageAttachment(Buffer.from(`(${asd})\n\n${evalued}`), 'eval.txt')
            message.author.send(att)
        } catch (err) {
            message.author.send(err, { code: 'js' })
        }
    }
}
