const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client()

client.on('ready', () => {
  new WOKCommands(client, {
    commandsDir: 'command',
    featureDir: 'features',
    showWarns: true
  }).setMongoPath(process.env.MONGODBL)
})

client.login(process.env.DISCORDJS_BOT_TOKEN)