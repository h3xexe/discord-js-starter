## SLASH COMMANDS
Create a file with you commands name.

`example.js`

```node
module.exports = {
	name: 'example',
	description: 'What your command does.',
	options: [{
		name: 'parameterOne',
		type: 'STRING',
		description: 'Description of parameter.',
		required: true,
	}],
	async execute(interaction) {
		await interaction.channel.send(interaction.options.getString('parameterOne'));
		await interaction.reply({ content: 'Your command issued.', ephemeral: true });
	},
};
```
