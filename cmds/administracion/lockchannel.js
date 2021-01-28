const Discord = require("discord.js");
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
	constructor() {
		super()

		this.name = "lockchannel"
		this.alias = []
		this.category = 'administracion'
		this.botPermissions = { guild: [], channel: ['MANAGE_CHANNELS'] }
		this.memberPermissions = { guild: [], channel: ['MANAGE_CHANNELS'] }

	}

	/**
	* @param {Object} obj
	* @param {Discord.Client} obj.client
	* @param {Discord.Message} obj.message
	*/
	run(obj) {
		const { message, client } = obj;

		const canal = message.channel,
			  permisos = canal.permissionOverwrites.get(message.guild.id);

		if(!permisos || !(permisos.deny.toArray().includes('SEND_MESSAGES'))) {
			return message.channel.updateOverwrite(message.guild.id, {
				SEND_MESSAGES: false
			}).then(() => {
				let embed = new Discord.MessageEmbed()
				.setColor(client.color)
				.setDescription(`<:moderator:779536592431087619> | ${message.author.username} ha bloqueado el canal para los miembros.`)
				.setTimestamp()
				return message.channel.send({ embed: embed })
			}).catch(err => {
				let embed = new Discord.MessageEmbed()
				.setColor(client.color)
				.setDescription(`<:cancel:779536630041280522> | Error al intentar bloquear el canal.`)
				.setTimestamp()
				.setFooter(err)
				return message.channel.send({ embed: embed })
			})
		}
		else {
			return message.channel.updateOverwrite(message.guild.id, {
				SEND_MESSAGES: null
			}).then(() => {
				let embed = new Discord.MessageEmbed()
				.setColor(client.color)
				.setDescription(`<:moderator:779536592431087619> | ${message.author.username} ha desbloqueado el canal para los miembros.`)
				.setTimestamp()
				return message.channel.send({ embed: embed })
			}).catch(err => {
				let embed = new Discord.MessageEmbed()
				.setColor(client.color)
				.setDescription(`<:cancel:779536630041280522> | Error al intentar desbloquear el canal.`)
				.setTimestamp()
				.setFooter(err)
				return message.channel.send({ embed: embed })
			})
		}
	}
}