module.exports = {
    config: {
        name: "checkblacklist",
        alias: [],
        description: "Revisar la blacklist",
        usage: "z!checkblacklist user_id",
        category: 'developer'
    },
    run: ({ message }) => {

        let res = require('child_process').execSync(`pm2 logs`).toString();

        res = res.split('').reverse().slice(0, 1900).reverse().join('')

        message.channel.send(res, { code: 'js' }).catch(() => { })

    }
};