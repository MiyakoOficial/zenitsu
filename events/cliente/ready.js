// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Client, Presence, Util } = require('discord.js');
const ms = require('ms'),
	model = require('../../models/temp')
require('dotenv').config();
const { loadImage } = require("canvas")
/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {

	client.imagenes = {

		porquelloras: {
			chica: await loadImage('/home/MARCROCK22/zenitsu/Utils/Images/chica.png'),
			chico: await loadImage('/home/MARCROCK22/zenitsu/Utils/Images/chico.jpg')
		},
		nicememe: {
			background: await loadImage('/home/MARCROCK22/zenitsu/Utils/Images/nicememe.png')
		}

	}

	checkTemp(client)

	presence(client)
	//TOP.GG
	const { dbl } = client;
	client.color = '#E09E36';

	setInterval(() => {

		if (client.token != process.env.BOT_TOKEN) {
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

/**
 * 
 * @param {import('discord.js').Client} client 
 */

async function checkTemp(client) {

	const find = await model.find()

	for await (let data of find) {

		try {

			if (Date.now() >= data.toDelete) {
				await model.deleteOne(data)
				continue;
			}

			if (Date.now() >= data.tiempo) {
				if (data.type == 'mute') {
					const guild = client.guilds.cache.get(data.guild)
					if (!guild) continue;
					const role = guild.roles.cache.get(data.role)
					if (!role) continue;
					const member = guild.members.cache.get(data.id) || await guild.members.fetch(data.id).catch(() => { })
					if (!member) continue;
					await member.roles.remove(role).catch(() => { });
					await model.deleteOne(data)
				}
				else if (data.type == 'ban') {
					const guild = client.guilds.cache.get(data.guild)
					if (!guild) continue;
					await guild.members.unban(data.id).catch(() => { });
					await model.deleteOne(data)
				}
			}
			else continue;
		}
		catch (e) {
			console.error(e)
			continue;
		}
	}

	await Util.delayFor(10000)

	return await checkTemp(client)

}