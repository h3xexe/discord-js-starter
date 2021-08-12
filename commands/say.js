module.exports = {
	name: 'say',
	description: 'Says anything you say.',
	options: [{
		name: 'input',
		type: 'STRING',
		description: 'Anything you want bot to say.',
		required: true,
	}],
	execute(interaction) {
		interaction.channel.send(interaction.options.getString('input'));
		interaction.reply({ content: ':white_check_mark:', ephemeral: true });
	},
};
