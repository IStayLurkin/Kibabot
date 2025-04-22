require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

// Create client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Collection for commands
client.commands = new Collection();

// Load commands from ./commands
for (const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Load events from ./events
for (const file of fs.readdirSync('./events').filter(file => file.endsWith('.js'))) {
  const event = require(`./events/${file}`);
  if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
  else client.on(event.name, (...args) => event.execute(...args, client));
}

// Login to Discord
client.login(process.env.DISCORD_TOKEN);

// Bot ready
client.once('ready', () => {
  console.log(`✅ Ready! Logged in as ${client.user.tag} (ID: ${client.user.id})`);
});

// Message handler
client.on('messageCreate', (message) => {
  if (message.author.bot || message.channel.isDMBased()) return;

  console.log(`[DEBUG] ${message.author.tag}: ${message.content}`);

  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(`❌ Error executing command "${commandName}":`, error);
    message.reply('There was an error executing that command.');
  }
});
