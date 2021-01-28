const { promisify } = require('util');
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
	constructor() {
		super()
		this.name = "exec"
		this.alias = ['ex']
		this.category = 'developer'
		this.dev = true;
	}
	// eslint-disable-next-line no-unused-vars
	async run({ message, args }) {

		if (!['507367752391196682'].includes(message.author.id))
			return;

		if (!args[0])
			return message.channel.send('eres o te haces?');

		try {

			const res = await promisify(require('child_process').exec)(args.join(' '));

			if (res.stderr.length) {
				message.channel.send('STDERR:\n' + res.stderr, { split: { char: '', maxLength: 1950 }, code: '' });
			}

			if (res.stdout.length) {
				message.channel.send('STDOUT:\n' + res.stdout, { split: { char: '', maxLength: 1950 }, code: '' });
			}

		} catch (err) {

			return message.channel.send('ERR:\n' + err, { split: { char: '', maxLength: 1950 }, code: '' });

		}
	}
};