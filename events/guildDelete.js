const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildDelete,
	async execute(guild, client) {
		await client.db.deleteGuild(guild);
	},
};
