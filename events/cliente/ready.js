// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Client } = require('discord.js');
const ms = require('ms')

/**
 * 
 * @param {Client} client 
 */

module.exports = (client) => {
    client.color = '#E09E36';
    client.erela.init(client.user.id);
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "z!help | " + client.guilds.cache.size + " servidores",
            type: "WATCHING"
        }
    });
    console.log('lito')
    /*setInterval(() => {
        console.log('intervalo')
        client.erela.players.map(a => {
            let guild = client.guilds.cache.get(a.guild);
            if (!guild) return a.destroy()
            let canalVoz = guild.channels.cache.get(a.voiceChannel);
            if (!canalVoz) return a.destroy()
            let members = canalVoz.members;
            let bot = members.get(client.user.id)
            if (!bot || !bot.voice) return a.destroy();
        })

    }, require('ms')('10s'));*/

    /*setInterval(() => {
        client.voice.connections.map(a => {
            let members = a.channel.members
            let membersF = a.channel.members.filter(a => !a.user.bot);
            if (membersF.size == 0) {
                let check = members.array()[0];
                let q = client.distube.getQueue(check.guild.id);
                if (!q) {
    
                    a.channel.leave().catch(() => { })
    
                    return;
    
                }
                try {
                    client.distube.emit('vacio', q.initMessage)
                    a.channel.leave()
                }
                catch (e) {
                    return console.log(e)
                }
            }
        });
    
    }, ms('60s'));*/
    setInterval(async () => {
        let canal = client.channels.cache.get('786997292040847401');
        let mensaje = await canal.messages.fetch('786997341998678056')
        let embed = new MessageEmbed()
            .setColor(client.color)
            .addField('Servidores', client.guilds.cache.size, true)
            .addField('Usuarios en cache', client.users.cache.filter(a => !a.bot).size, true)
            .addField('Conexiones de voz', client.voice.connections.size, true)
        mensaje.edit({ embed: embed })
    }, ms('5m'));
};