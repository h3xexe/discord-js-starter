const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	noHelp: true,
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
		await message.channel.send({ embeds: [this.embed] });
	},
};

