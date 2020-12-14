module.exports = {
    config: {
        name: "reset",
        alias: ['offbot'],
        description: "reset",
        usage: "z!reset",
        category: 'developer',
        botPermissions: [],
        memberPermissions: []

    },
    // eslint-disable-next-line no-unused-vars
    run: ({ client, message, args, embedResponse, Hora }) => {

        if (!['507367752391196682'].includes(message.author.id))
            return;

        try {

            require('child_process').execSync(`git pull && pm2 restart 0`).toString();

        } catch (err) {

            message.channel.send(err, { code: 'js' }).catch(() => { })

        }
    }
}
