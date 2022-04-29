const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Pong',
	async execute(client, message) {
		const newMessageTimestamp = await message.channel.send('Pinging...').then(m => m.createdTimestamp);
		const embed = new MessageEmbed()
			.addField('💻 API Latency', `${Math.round(message.client.ws.ping)}ms`)
			.addField('🏓 Latency', `${newMessageTimestamp - message.createdTimestamp}ms`);
		message.reply({ embeds: [embed] });
	},
};
