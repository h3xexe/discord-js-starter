const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	noHelp: true,
	options: [{
		name: 'commandName',
	}],
	boot(client) {
		this.embed = new MessageEmbed()
			.setTitle('Help')
			.setColor(process.env.EMBED_COLOR || '#ffffff');

		client.chat_commands.forEach(command => {
			if(!command.noHelp) {
				this.embed.addField(`${process.env.PREFIX}${command.name}`, command.description || '-');
			}
		});
	},
	async execute(client, message, args) {
		if (args.commandName && client.chat_commands.get(args.commandName)) {
			const command = client.chat_commands.get(args.commandName);
			const parameters = command.options.map(o => o.readable || o.name).join(' ');
			await message.channel.send(`${process.env.PREFIX}${command.name} \`\`${parameters}\`\``);
		}
		else {
			await message.channel.send({ embeds: [this.embed] });
		}
	},
};

