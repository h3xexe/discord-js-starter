const fs = require('node:fs');
const dotenv = require('dotenv');
const { Client, GatewayIntentBits, Collection, REST } = require('discord.js');
dotenv.config();

// TODO intents should be in config file
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
] });

// PRISMA INITIATE
client.db = require('./utils/db');
client.db.init(client);

// LOGGER INITIATE
require('./utils/logger').init(client);
const logs = require('discord-logs');
logs(client);

// REGISTER SLASH COMMANDS
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const fileName of commandFiles) {
	const command = require(`./commands/${fileName}`);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		client.logger.warn(`The command at ${fileName} is missing a required "data" or "execute" property.`);
	}
}
client.Rest = new REST().setToken(process.env.TOKEN);

// REGISTER CHAT COMMANDS
client.chat_commands = new Collection();
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
