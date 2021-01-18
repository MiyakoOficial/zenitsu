const { sendEmbed } =require('../../Utils/Functions');
module.exports = {
	config: {
		name: "conecta4top", //Nombre del cmd
		alias: [`connect4top`, 'fourinrowtop', '4enlineatop', 'c4top'], //Alias
		description: "Ver el top de los mejores jugadores.", //Descripción (OPCIONAL)
		usage: "z!connect4top <global/server> <easy/medium/hard>",
		category: 'diversion',
		botPermissions: [],
		memberPermissions: []
	},

	/**
    * @param {Object} obj
    * @param {import('discord.js').Message} obj.message
    * @param {import('discord.js').Client} obj.client
	* @param {Array<String>} obj.args
    */

	run: async (obj) => {

		const { message, args, client } = obj;

		const difficulty = ['easy','medium','hard'].includes(args[0]?.toLowerCase()) ? args[0]?.toLowerCase() : 'medium'

		let data = await require('../../models/c4top.js').find({ difficulty }).sort({ganadas: -1})

		data = data.slice(0, 10)

		if(!data.length)
			return sendEmbed({
				description: `Aún no hay datos en la dificultad ${difficulty}`,
				channel: message.channel
			});
		
		const description = data.map(item => {

			return `${client.users.cache.get(item.id)?.username ||item.cacheName}\nGanadas: ${item.ganadas} Perdidas: ${item.perdidas}`
			
		}).join('\n')
		
		return sendEmbed({
			description,
			channel: message.channel,
			footerText: difficulty
		})
	}
};