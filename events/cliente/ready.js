// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Client, Presence } = require('discord.js');
const ms = require('ms')
require('dotenv').config()
/**
 * 
 * @param {Client} client 
 */

module.exports = (client) => {

	presence(client)
	//TOP.GG
	const { dbl } = client;
	client.color = '#E09E36';

	setInterval(() => {

		if(!client.token) {
			client.token = process.env.BOT_TOKEN
			client.login(client.token)
		}
		
	}, 10000)
	
	setInterval(() => {
		dbl.postStats(client.guilds.cache.size);
	}, 1800000);//30m
	//TOP.GG

	setInterval(async () => {
		presence(client);
		let canal = client.channels.cache.get('786997292040847401');
		let mensaje = canal.messages.cache.get('786997341998678056') || await canal.messages.fetch('786997341998678056')
		let embed = new MessageEmbed()
			.setColor(client.color)
			.addField('Servidores', client.guilds.cache.size, true)
			.addField('Usuarios en cache', client.users.cache.filter(a => !a.bot).size, true)
		mensaje.edit({ embed: embed })
	}, ms('5m'));
};

/**
@param {Client} client
@returns {Promise<Presence>}
*/

function presence(client) {
	return client.user.setPresence({
		status: "idle",
		activity: {
			name: "z!help | " + client.guilds.cache.size + " servidores",
			type: "WATCHING"
		}
	});
}