const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
	constructor() {
		super()
		this.name = "asynceval"
		this.alias = ['ae']
		this.category = 'developer'
		this.dev = true;
	}
	async run(obj) {

		const Discord = require("discord.js")
		const { replace } = require('../../Utils/Functions.js');
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, embedResponse, Hora } = obj;
		if (!client.devseval.includes(message.author.id))
			return;
		try {
			let code = args.join(" ");
			let evalued = await eval(`(async() => {${code}})()`);
			let TYPE = typeof (evalued)
			evalued = require("util").inspect(evalued, { depth: 0 });
			evalued = replace(evalued, [client.token, process.env.MONGODB, process.env.WEBHOOKID, process.env.WEBHOOKTOKEN, process.env.DBLTOKEN])
			const res = Discord.Util.splitMessage(evalued, { char: '', maxLength: 2000 });

			for (let minires of res) {
				const embed = new Discord.MessageEmbed()
					.setColor(client.color)
					.setDescription('```js\n' + minires + '\n```')
					.setTimestamp()
					.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
					.addField('typeof', '```js\n' + TYPE + '\n```', true)
				message.channel.send({ embed: embed })
				await Discord.Util.delayFor(2000)
			}
		} catch (err) {
			message.channel.send(err, { code: 'js' })
		}
	}
}