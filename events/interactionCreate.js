module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.client.commands.has(interaction.commandName)) return;

		try {
			await interaction.client.commands.get(interaction.commandName).execute(interaction);
		}
		catch (error) {
			interaction.client.logger.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
