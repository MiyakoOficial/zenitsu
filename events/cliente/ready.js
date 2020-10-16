const ms = require('ms')

module.exports = async (client) => {
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "z!help | " + client.guilds.cache.size + " servidores",
            type: "WATCHING"
        }
    });

    setInterval(() => {

        client.channels.cache.get('755938504470691871').setName(`Guilds: ${client.guilds.cache.size}`);

        client.channels.cache.get('756249790211162123').setName(`Users: ${client.users.cache.filter(a => !a.bot).size}`);

    }, ms('5m'));
};