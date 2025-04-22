
# Kibabot
kiba bot
=======
# 🤖 KibaBot

KibaBot is a powerful, customizable Discord bot with advanced features like slash commands, personality modes, logging, sound alerts, and full local fallback. Designed for ease of use and rapid feature expansion.

![Discord](https://img.shields.io/badge/Discord-Bot-7289DA?logo=discord&style=flat-square)
![Node](https://img.shields.io/badge/Node.js-18%2B-brightgreen?logo=node.js&style=flat-square)

---

## 🚀 Features

- 🎤 Slash command system (`/roll`, `/quote`, `/weather`, and more)
- 😎 Personality & mood modes per user
- 🔊 Sound triggers + alert system
- 📦 Local fallback + auto-restart
- 📈 Logging, stats, and scheduling
- 🧠 GPT-powered chat and auto-mod logic
- 🎮 Expandable with games, XP, quests

---

## 📦 Installation

### 1. Clone the repo
```bash
git clone https://github.com/IStayLurkin/Kibabot.git
cd Kibabot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create your `.env` file
Copy this template and fill in your info:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_bot_application_id
GUILD_ID=your_test_server_id
```

---

## 🧪 Run the bot

```bash
node bot.js
```

---

## 📤 Register Slash Commands

Only required the **first time** or after editing commands:
```bash
npm run register
```

---

## 💡 Add More Commands

To add a new slash command:

1. Create a new file in `/commands`
2. Follow the same structure as existing commands
3. Re-run `npm run register`

---

## 🛠 Dev Scripts

```bash
npm run register     # Deploy slash commands to Discord
npm run dev          # (Optional) Run bot with hot reload (if configured)
```

---

## 📄 License

MIT © [@IStayLurkin](https://github.com/IStayLurkin)
