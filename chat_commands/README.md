## CHAT COMMANDS
You can also create commands to use with a prefix instead of slash.

`say.js`
```node
module.exports = {
	name: 'say',
	description: 'Say something!',
	options: [{
		name: 'wordToSay',
		description: 'Anything you want bot to say.',
        // Rule of validatorjs
		rule: 'required|min:2|max:25',
	}],
	async execute(client, message, args) {
		await message.delete();
		await message.channel.send(args.wordToSay);
	},
};
```
