module.exports = {
	name: 'say',
	description: 'Say something!',
	options: [{
		name: 'wordToSay',
		// TODO a beautiful name field. (Human readable)
		description: 'Anything you want bot to say.',
		// Rule of validatorjs
		rule: 'required|min:2|max:25',
	}],
	async execute(client, message, args) {
		await message.delete();
		await message.channel.send(args.wordToSay);
	},
};

