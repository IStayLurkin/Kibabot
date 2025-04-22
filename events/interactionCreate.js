
module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    if (!interaction.isCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (command) command.execute(interaction);
  },
};