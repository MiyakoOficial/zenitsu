module.exports = {
    config: {
        name: "console",
        alias: [],
        description: "console",
        usage: "z!console",
        category: 'developer'
    },
    run: ({ message }) => {

        if ('507367752391196682' !== message.author.id)
            return;

        let res = require('child_process').execSync(`pm2 logs`).toString();

        res = res.split('').reverse().slice(0, 1900).reverse().join('')

        message.channel.send(res, { code: 'js' }).catch(() => { })

    }
};