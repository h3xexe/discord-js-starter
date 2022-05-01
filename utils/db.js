const { PrismaClient } = require('@prisma/client');

module.exports = {
	init :  async (client) => {
		this.client = client;
		client.prisma = new PrismaClient();
		client.prisma.$connect();
		// client.prisma.$use(async (params, next) => {
		// 	if (params.model == 'Guilds' && params.action == 'update') {
		// 		console.log(params);
		// 	}
		// 	return next(params);
		// });
	},
	deleteGuild: async (guild) => {
		await this.client.prisma.guilds.update({
			where:{
				id: guild.id,
			},
			data:{
				kicked: true,
			},
		});
	},
	createOrGetGuild: async (guild, setLastSeen = null) => {
		const guildData = await this.client.prisma.guilds.findUnique({
			where: {
				id: guild.id,
			},
		});
		if (guildData && guildData.name === guild.name && !setLastSeen) {return guildData;}
		return await this.client.prisma.guilds.upsert({
			where: { id: guild.id },
			update:{
				name: guild.name,
				lastSeen:	setLastSeen,
				kicked: false,
			},
			create:{
				id: guild.id,
				name: guild.name,
				lastSeen:	new Date().toISOString(),
				prefix: process.env.PREFIX,
			},
		});
	},
};
