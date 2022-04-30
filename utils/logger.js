const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize } = format;

module.exports = {
	init :  async (client) => {
		client.logger = createLogger({
			transports: [
				new transports.Console({ format: combine(colorize({
					all:true,
				})) }),
				new transports.File({ filename: 'log', timestamp: true }),
			],
			format: combine(
				timestamp({ format:'YY-MM-DD HH:MM:SS' }),
				format.printf(log => `${log.timestamp} [${log.level.toUpperCase()}] ${log.message}`),
			),
		});

		client.logger.info('Logger initiated');
		client.on('ready', () => client.logger.info(`Ready! Logged in as ${client.user.tag}`));
		client.on('debug', m => client.logger.debug(m));
		client.on('warn', m => client.logger.warn(m));
		client.on('error', m => client.logger.error(m));
		process.on('uncaughtException', error => client.logger.error(error.stack));
	},
};
