module.exports = {
    config: {
        name: "exec",
        alias: ['ex'],
        description: "shell",
        usage: "z!exec npm i",
        category: 'developer'
    },
    // eslint-disable-next-line no-unused-vars
    run: ({ client, message, args, embedResponse, Hora }) => {

        if ('507367752391196682' !== message.author.id)
            return embedResponse('No puedes usar este comando!')

        try {
            let date = Date.now();
            let res = require('child_process').execSync(args.join(' ')).toString();

            res = res.split('').reverse().slice(0, 2000).reverse().join('')

            message.channel.send(res, { code: 'js' }).catch(() => { })
            message.channel.send(`Tiempo: ${Date.now() - date}`).catch(() => { })

        } catch (err) {

            message.channel.send(err, { code: 'js' }).catch(() => { })

        }
    }
}
