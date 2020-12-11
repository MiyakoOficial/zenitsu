const ms = require('ms')

module.exports = (client) => {
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "z!help | " + client.guilds.cache.size + " servidores",
            type: "WATCHING"
        }
    });

    setInterval(() => {

        client.voice.connections.map(a => {


            let members = a.channel.members
            let membersF = a.channel.members.filter(a => !a.user.bot);
            console.log(members)
            if (membersF.size == 0) {

                let q = client.distube.getQueue(client.guilds.cache.get(members.array()[0].guild.id));
                console.log(q)
                if (!q) return;
                try {
                    a.channel.leave()

                    client.distube.emit('empty', q.songs[0].message)
                }
                catch (e) {
                    return;
                }
            }

        });

    }, ms('5s'));


    setInterval(() => {


        client.channels.cache.get('755938504470691871').setName(`Guilds: ${client.guilds.cache.size}`).catch(() => { });

        client.channels.cache.get('756249790211162123').setName(`Users: ${client.users.cache.filter(a => !a.bot).size}`).catch(() => { });


    }, ms('5m'));

};