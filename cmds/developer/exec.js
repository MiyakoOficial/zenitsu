const { promisify } = require('util');
module.exports = {
	config: {
		name: "exec",
		alias: ['ex'],
		description: "shell",
		usage: "z!exec npm i",
		category: 'developer',
		botPermissions: [],
		memberPermissions: []

	},
	// eslint-disable-next-line no-unused-vars
	run: async ({ message, args }) => {

		if (!['507367752391196682'].includes(message.author.id))
			return;

		if (!args[0])
			return;

		try {
			// eslint-disable-next-line no-unused-vars
			const res = await promisify(require('child_process').exec)(args.join(' '))

			if(res.stderr.length){
				message.channel.send(res.stderr, {split: {char: '', maxLength: 1950}, code: ''})
			}

			if(res.stdout.length){
				message.channel.send(res.stdout, {split: {char: '', maxLength: 1950}, code: ''})
			}

		} catch (err) {

			return message.channel.send(err, {split: {char: '', maxLength: 1950}, code: ''});

		}
	}
}
