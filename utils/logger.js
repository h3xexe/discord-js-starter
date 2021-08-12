const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;

module.exports = {
	init :  async (client) => {
		client.logger = createLogger({
			transports: [
				new transports.Console(),
				new transports.File({ filename: 'log' }),
			],
			format: combine(
				format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
				timestamp(),
			),
		});

		client.logger.info('Logger initiated');
		client.on('ready', () => client.logger.info(`Ready! Logged in as ${client.user.tag}`));
		client.on('debug', m => client.logger.debug(m));
		client.on('warn', m => client.logger.warn(m));
		client.on('error', m => client.logger.error(m));

		process.on('uncaughtException', error => client.logger.error(error));
	},
};
