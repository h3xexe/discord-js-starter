module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
		await client.db.deleteGuild(guild);
	},
};
