module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		// eslint-disable-next-line no-unused-vars
		const commands = client.commands.map(({ execute, ...data }) => data);

		/**
		 * Global commands are cached for one hour.
		 * New global commands will fan out slowly across all guilds and will only be guaranteed to be updated after an hour.
		 * Guild commands update instantly.
		 **/
		if (process.env?.DEBUG_MODE === 'true') {
			client.application?.commands.set([]);
			client.logger.warn('Global command reset done');
		}
		else {
			client.logger.warn('Updating global commands');
			await client.application?.commands.set(commands);
		}

		// UPDATING SERVER COMMANDS
		if (process.env.TEST_GUILD) {
			client.guilds.cache.get(process.env.TEST_GUILD)?.commands.set(commands);
			client.logger.debug('Test guilds commands updated');
		}
	},
};
