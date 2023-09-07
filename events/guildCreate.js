const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildCreate,
	async execute(guild, client) {
		await client.db.createOrGetGuild(guild, new Date().toISOString());
	},
};
