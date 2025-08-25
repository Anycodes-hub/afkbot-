const mineflayer = require('mineflayer')
const http = require('http')

// ---- Tiny web server for Render ----
const PORT = process.env.PORT || 10000
http.createServer((req, res) => {
  res.writeHead(200)
  res.end('AFK bot running ✅')
}).listen(PORT, () => console.log(`Web server listening on port ${PORT}`))

// ---- Mineflayer bot ----
function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST || "scholgroup.aternos.me",
    port: parseInt(process.env.MC_PORT) || 59561,
    username: process.env.MC_USERNAME || "bottt",
    version: "1.21.8"
  })

  bot.on('spawn', () => {
    console.log("✅ Bot has joined the server!")
    bot.chat("")
  })

  bot.on('end', () => {
    console.log("❌ Bot disconnected, reconnecting...")
    setTimeout(createBot, 10000)
  })
}

createBot()
