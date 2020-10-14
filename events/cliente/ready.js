const ms = require('ms')

module.exports = async (client) => {
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "z!help",
            type: "WATCHING"
        }
    });

    setInterval(() => {

        client.channels.cache.get('755938504470691871').setName(`Guilds: ${client.guilds.cache.size}`);

        client.channels.cache.get('756249790211162123').setName(`Users: ${client.users.cache.size}`);

    }, ms('5m'));

    console.log(`${client.user.tag} está listo!`);
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "z!help",
            type: "WATCHING"
        }

    })

};