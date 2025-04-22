console.log('messageCreate event loaded!');

const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const LOG_CHANNEL_ID = '1364373343918362665';

async function sendLog(client, content) {
  try {
    const channel = await client.channels.fetch(LOG_CHANNEL_ID);
    if (channel) await channel.send({ content });
  } catch (err) {
    console.warn('[KIBA-LOGGING] Failed to send log:', err.message);
  }
}

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    console.log(`[KIBA] ${message.author.tag}: ${message.content}`);
    sendLog(client, `💬 ${message.author.tag}: ${message.content}`);

    // Ignore bots and DMs
    if (message.author.bot || !message.guild) {
      console.log('[KIBA] Ignoring bot or DM.');
      return;
    }

    const botMentioned = message.mentions.has(client.user);
    const endsWithQuestion = message.content.trim().endsWith('?');

    console.log(`[KIBA] Mentioned: ${botMentioned}, Ends with '?': ${endsWithQuestion}`);

    // Only respond if bot is tagged OR it's a question
    if (!botMentioned && !endsWithQuestion) {
      console.log('[KIBA] No trigger detected. Skipping response.');
      return;
    }

    // Handle possible different mention formats
    const mentionRegex = new RegExp(`<@!?${client.user.id}>`, 'g');
    const cleanedMessage = message.content.replace(mentionRegex, '').trim();

    try {
      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: cleanedMessage }],
      });

      const reply = chatResponse.choices[0].message.content;
      console.log('[KIBA] Sending reply...');
      await message.reply(reply);
    } catch (err) {
      console.error('Freeform GPT Error:', err);
      sendLog(client, `❌ GPT Error from ${message.author.tag}: \`${err.message}\``);
    }
  }
};


