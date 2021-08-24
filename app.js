const fs = require('fs');
const dotenv = require('dotenv');
const { Client, Intents, Collection } = require('discord.js');
dotenv.config();

// TODO intents should be in config file
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// LOGGER INITIATE
require('./utils/logger').init(client);
const logs = require('discord-logs');
logs(client);

client.commands = new Collection();
client.chat_commands = new Collection();

// SLASH COMMAND HANDLING
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	client.logger.info(`${command.name} Command loaded!`);
}

// MESSAGE COMMAND HANDLING
const chatCommandFiles = fs.readdirSync('./chat_commands').filter(file => file.endsWith('.js'));

for (const file of chatCommandFiles) {
	const chat_command = require(`./chat_commands/${file}`);
	client.chat_commands.set(chat_command.name, chat_command);
	client.logger.info(`${chat_command.name} Chat command loaded!`);
}

// EVENT HANDLING
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
	client.logger.info(`${event.name} Event loaded!`);
}

client.login(process.env.TOKEN);
