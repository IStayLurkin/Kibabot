module.exports = {
  apps: [{
    name: "KibaBot",
    script: "bot.js",
    watch: true,
    autorestart: true,
    env: {
      NODE_ENV: "production"
    }
  }]
}
