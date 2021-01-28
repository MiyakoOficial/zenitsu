const { sendEmbed } = require('../../Utils/Functions');
const Command = require('../../Utils/Classes').Command
module.exports = class Comando extends Command {
	constructor() {
		super()
		this.name = "conecta4top"
		this.alias = [`connect4top`, 'fourinrowtop', '4enlineatop', 'c4top']
		this.category = 'diversion'
	}

	/**
	* @param {Object} obj
	* @param {import('discord.js').Message} obj.message
	* @param {import('discord.js').Client} obj.client
	* @param {Array<String>} obj.args
	*/

	async run(obj) {

		const { message, args, client } = obj;

		const difficulty = ['easy', 'medium', 'hard'].includes(args[0]?.toLowerCase()) ? args[0]?.toLowerCase() : 'medium'

		let data = await require('../../models/c4top.js').find({ difficulty }).sort({ ganadas: -1 })

		data = data.slice(0, 10)

		if (!data.length)
			return sendEmbed({
				description: `<:cancel:804368628861763664> | Aún no hay datos en la dificultad ${difficulty}`,
				channel: message.channel
			});

		const description = data.map(item => {

			return `${client.users.cache.get(item.id)?.username || item.cacheName}\nGanadas: ${item.ganadas} Perdidas: ${item.perdidas} Empates: ${item.empates}`

		}).join('\n\n')

		return sendEmbed({
			description,
			channel: message.channel,
			footerText: difficulty
		})
	}
};