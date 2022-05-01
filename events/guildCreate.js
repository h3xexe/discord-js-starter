module.exports = {
	name: 'guildCreate',
	async execute(guild, client) {
		await client.db.createOrGetGuild(guild, new Date().toISOString());
	},
};
