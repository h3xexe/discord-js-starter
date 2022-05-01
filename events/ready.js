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

		// CALLING BOOT FUNCTIONS
		client.chat_commands.forEach(command => {
			if (command.boot) {command.boot(client);}
		});

		// CREATE DB RECORDS OF GUILDS
		// Last seen date
		const lastSeen = new Date().toISOString();
		for (const guildObject of client.guilds.cache) {
			guildObject[1].settings = await client.db.createOrGetGuild(guildObject[1], lastSeen);
		}
		// Update kicked servers
		await client.prisma.guilds.updateMany({
			where: {
				NOT: {
					lastSeen: lastSeen,
				},
			},
			data: {
				kicked: true,
			},
		});

		// UPDATING SERVER COMMANDS
		if (process.env.TEST_GUILD) {
			client.guilds.cache.get(process.env.TEST_GUILD)?.commands.set(commands);
			client.logger.debug('Test guilds commands updated');
		}
	},
};
