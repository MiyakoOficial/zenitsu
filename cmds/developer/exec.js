module.exports = {
    config: {
        name: "exec",
        alias: ['ex'],
        description: "shell",
        usage: "z!exec npm i",
        category: 'developer',
        botPermissions: [],
        memberPermissions: []

    },
    // eslint-disable-next-line no-unused-vars
    run: ({ client, message, args, embedResponse, Hora }) => {

        if (!['507367752391196682'].includes(message.author.id))
            return;

        if (!args[0])
            return;

        try {
            return require('child_process').exec(args.join(' '), (err, stdout, stderr) => {
                if (err) return message.channel.send(err, { code: '', split: { char: '', maxLength: 1900 } })
                return message.channel.send(stdout.toString(), { code: '', split: { char: '', maxLength: 1900 } })
            })
        } catch (err) {

            return message.channel.send(err, { code: 'js' }).catch(() => { })

        }
    }
}
