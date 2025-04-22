require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder().setName('roll').setDescription('Roll a 6-sided die'),
  new SlashCommandBuilder().setName('quote').setDescription('Get a random quote'),
  new SlashCommandBuilder().setName('weather').setDescription('Check the weather')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Commands registered successfully.');
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
  }
})();
