module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};
