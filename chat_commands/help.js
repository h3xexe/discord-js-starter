const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	noHelp: true,
	options: [{
		name: 'commandName',
	}],
	async execute(client, message, args) {
		// Command specified help
		if (args.commandName && client.chat_commands.get(args.commandName)) {
			const command = client.chat_commands.get(args.commandName);
			const parameters = command.options.map(o => o.readable || o.name).join(' ');
			await message.channel.send(`${message.guild.settings.prefix}${command.name} \`\`${parameters}\`\``);
		}
		else {
			// Creating a new embed
			const embed = new MessageEmbed()
				.setTitle('📖 Help')
				.setColor(process.env.EMBED_COLOR || '#ffffff');

			// Add a field to embed for each command
			client.chat_commands.forEach(command => {
				if(!command.noHelp) {
					embed.addField(`${message.guild.settings.prefix}${command.name}`, command.description || '-');
				}
			});
			await message.channel.send({ embeds: [embed] });
		}
	},
};

