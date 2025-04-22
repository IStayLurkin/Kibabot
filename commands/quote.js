
const quotes = [
  "Do or do not. There is no try.",
  "Stay awhile and listen.",
  "The cake is a lie."
];

module.exports = {
  name: "quote",
  description: "Get a random quote.",
  execute(interaction) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    interaction.reply(quote);
  }
};