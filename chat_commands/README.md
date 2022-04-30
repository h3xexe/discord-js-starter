## CHAT COMMANDS
You can also create commands to use with a prefix instead of slash.

`say.js`
```node
module.exports = {
	name: 'say',
	description: 'Say something!',
	options: [{
		name: 'wordToSay',
        // readable name for - .help say
		readable: 'Anything you want',
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

### Validatorjs Rules
You can define almost any rule for your command's parameters. Here is more information about what you can do.
https://www.npmjs.com/package/validatorjs
