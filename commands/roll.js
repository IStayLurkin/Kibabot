
module.exports = {
  name: "roll",
  description: "Roll a dice!",
  execute(interaction) {
    const roll = Math.floor(Math.random() * 6) + 1;
    interaction.reply(`🎲 You rolled a ${roll}!`);
  }
};