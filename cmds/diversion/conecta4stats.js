const { sendEmbed } = require('../../Utils/Functions.js');
const Discord = require('discord.js');
module.exports = {
	config: {
		name: "conecta4stats", //nombre del cmd
		alias: [`connect4stats`, 'fourinrowstats', '4enlineastats', 'c4stats'], //Alias
		description: "Manda el perfil de un miembro", //Descripción (OPCIONAL)
		usage: "z!conecta4stats @mencion",
		category: 'diversion',
		botPermissions: [],
		memberPermissions: []

	}, run: async ({ message, args, client }) => {

		let member = message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member

		let data = await require('../../models/c4top.js').find({ id: member.user.id });

		if(!data || !data.length)
			return sendEmbed({
				channel: message.channel,
				description: `<:cancel:779536630041280522> | ${member.user} no tiene datos.`
			});

		const easy = data.find(item=>item.difficulty == 'easy'),
			  medium = data.find(item=>item.difficulty == 'medium'),
			  hard = data.find(item=>item.difficulty == 'hard')

		let embed = new Discord.MessageEmbed()
		.setColor(client.color)
		if(easy) embed.addField('Facil', `Ganadas: ${easy.ganadas} Perdidas: ${easy.perdidas}`)
		if(medium) embed.addField('Intermedio', `Ganadas: ${medium.ganadas} Perdidas: ${medium.perdidas}`)
		if(hard) embed.addField('Dificil', `Ganadas: ${hard.ganadas} Perdidas: ${hard.perdidas}`)

		return message.channel.send({ embed: embed });
	}
}	