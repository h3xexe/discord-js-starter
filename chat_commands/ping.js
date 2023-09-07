const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Get latency information with some extra data.',
	secondsToDhms(seconds) {
		seconds = Number(seconds) / 1000;
		const d = Math.floor(seconds / (3600 * 24));
		const h = Math.floor(seconds % (3600 * 24) / 3600);
		const m = Math.floor(seconds % 3600 / 60);
		const s = Math.floor(seconds % 60);

		const dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : '';
		const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
		const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
		const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
		return dDisplay + hDisplay + mDisplay + sDisplay;
	},
	async execute(client, message) {
		const newMessageTimestamp = await message.channel.send('Pinging...').then(m => m.createdTimestamp);
		const embed = new EmbedBuilder()
			// .setColor(process.env.EMBED_COLOR || '#ffffff')
			.addFields(
				{ name: '💻 API Latency', value: `╚═\`\`${Math.round(message.client.ws.ping)}ms\`\``, inline:true },
				{ name:'🏓 Latency', value: `╚═\`\`${newMessageTimestamp - message.createdTimestamp}ms\`\``, inline:true },
				{ name:'⏱️ Uptime', value: `╚═\`\`${this.secondsToDhms(client.uptime)}\`\``, inline:false },

			);
		message.reply({ embeds: [embed] });
	},
};
