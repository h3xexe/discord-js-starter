const validator = require('../utils/validator');
const { Events } = require('discord.js');


module.exports = {
	name: Events.MessageCreate,
	async execute(message, client) {
		// TODO Chat command handler should be in dedicated file
		if (!message.guild.settings) {
			message.guild.settings = await client.db.createOrGetGuild(message.guild);
		}
		// CHAT COMMAND HANDLER
		if (!message.content.startsWith(message.guild.settings.prefix) || message.author.bot) return;
		const parsedMessage = message.content.split(' ');
		const commandName = parsedMessage[0].slice(message.guild.settings.prefix.length);
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
			client.logger.error(error.stack);
			return await message.reply({ content: 'There was an error while executing this command!' });
		}
		// END CHAT COMMAND HANDLER
	},
};
