const validator = require('../utils/validator');

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		// TODO Chat command handler shoul be in dedicated file
		// CHAT COMMAND HANDLER
		if (!message.content.startsWith(process.env.PREFIX)) return;
		const parsedMessage = message.content.split(' ');
		const commandName = parsedMessage[0].slice(process.env.PREFIX.length);
		let inputs = {};
		try {
			const command = client.chat_commands.get(commandName);
			if (!command) return;
			// Input validation
			const args = parsedMessage.slice(1);
			if (command.options?.length > 0) {
				inputs = validator.validate(command.options, args);
			}
			command.execute(client, message, inputs);
		}
		catch (error) {
			if (error?.name === 'ValidationFailed') {return await message.reply(error.message);}
			return await message.reply({ content: 'There was an error while executing this command!' });
		}
		// END CHAT COMMAND HANDLER
	},
};
