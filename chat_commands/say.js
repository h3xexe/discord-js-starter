module.exports = {
	name: 'say',
	description: 'Say something!',
	options: [{
		name: 'wordToSay',
		type: 'STRING',
		description: 'Anything you want bot to say.',
		rule: 'required|min:2|max:25',
	}],
	execute(client, message, args) {
		message.delete();
		message.channel.send(args.wordToSay);
	},
};
