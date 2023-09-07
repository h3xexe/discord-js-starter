const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Bot says anything you say.')
		.addStringOption(option => option
			.setName('text')
			.setDescription('Anything you want bot to say.')
			.setRequired(true)),
	async execute(interaction) {
		interaction.channel.send(interaction.options.getString('input'));
		interaction.reply({ content: ':white_check_mark:', ephemeral: true });
	},
};
