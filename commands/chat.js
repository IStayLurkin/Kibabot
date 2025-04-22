const { SlashCommandBuilder } = require('discord.js');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = {
  name: 'chat',
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Talk to Kiba using GPT!')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('What do you want to say?')
        .setRequired(true)
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString('prompt');
    await interaction.deferReply();

    try {
      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      const reply = chatResponse.choices[0].message.content;
      await interaction.editReply(reply);
    } catch (err) {
      console.error('GPT Error:', err);
      await interaction.editReply('❌ Sorry, I had a problem talking to GPT.');
    }
  },
};
