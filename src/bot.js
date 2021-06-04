const { Client } = require('discord.js')
const bot = new Client();

const path = require('path')
const fs = require('fs')

const extra = require('../languages/extra.json')
const avatar = require('../commands/avatar')
const debug = require('../commands/debug')
const giveaway = require('../commands/giveaway')
const help = require('../commands/help')
const selfRole = require('../commands/selfRole')
const servers = require('../commands/servers')
const setfriendrole = require('../commands/setfriendrole')
const setfriendwelcome = require('../commands/setfriendwelcome')
const setgiveawayrole = require('../commands/setgiveawayrole')
const setprefix = require('../commands/setprefix')
const setwelcome = require('../commands/setwelcome')
const status = require('../commands/status')
const logsystem = require('../function/log-system')
const setupstats = require('../commands/setupstats')
const mongo = require('../function/mongo')
const configSchema = require('../schema/config-schema')

const token = require('../config/mongodb.json')

//Bot login
bot.login(token.DISCORDJS_BOT_TOKEN);

//Check if bot is online

bot.on('ready', async () => {

    console.log(`${bot.user.tag}`)
    bot.user.setPresence({
        activity: {
            name: `${extra.first_state}`,
            //Types -> "PLAYING", "STREAMING", "LISTENING", "WATCHING" -> Später im Command änderbar. Also auch Liste dafür.
            type: 'WATCHING'
        }
    })

    avatar(bot)
    debug(bot)
    giveaway(bot)
    help(bot)
    selfRole(bot)
    servers(bot)
    setfriendrole(bot)
    setfriendwelcome(bot)
    setgiveawayrole(bot)
    setprefix(bot)
    setwelcome(bot)
    status(bot)
    logsystem(bot)
    setupstats(bot)

    /*const baseFile = 'command.js'
    const commandBase = require(`./command/${baseFile}`)
  
    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
          const option = require(path.join(__dirname, dir, file))
          commandBase(bot, option)
        }
      }
    }
  
    readCommands('command')
  });
 
    bot.guilds.cache.forEach(async (guild) => {
        //1 | 2 | 3 | 4
        await mongo().then(async (mongoose) => {
            try {
               await configSchema.findOneAndUpdate({
                   _id: guild.id
               }, {
                    _id: guild.id,
                    prefix: "OS!" //<- Wenn keine Config existiert, soll automatisch eine erstellt werden und als Standart Prefix "OS!" genommen werden. Aber, falls config existiert, soll nichts geändert werden.
               }, {
                   upsert: true
               })
            } finally {
                 
            }
        })
    
        console.log("Config created")
    })
     */
  })
 

// Help command einrichten. <- Priorität
// Man soll Privat nachrichten erhalten können, wenn mit einem was gemacht wird. (Rang erhalten, entfernen, kicken, bannen, muten, moven, etc.)
// Diese Benachrichtigungen kann man an & Ausschalten.
// Man soll auch Silent an machen können, damit man unbemerkt leute moven, kicken, bannen, etc. kann. -> Man erhält keine Benachrichtigung mehr.
// Bot soll Musik im Channel abspielen können || Dabei soll er auch Nightcore, Vaporwave, etc. haben.
// Nachrichten schöner gestallten
// Mehrere Sprachen integrieren -> Standart Englisch
// Join, booster Nachrichten -> Kann aktiviert werden.
// Karuta automatischer Worker sucher.
// Server Name, Region, etc über Bot einstellbar
// LOG System
// Self-Roles
// Git-Lab / Git-Hub einrichten -> Damit man mit verfolgen kann, was neu ist.
// Debug Rang fertig machen
// Ban, Mute, Kick, etc. || Administrative Commands
// Webinterface || Alles soll darber Konfiguriert werden können. -> Als auch soll darin ein Admin Interface & User Interface befinden. Im Interface soll man weitere Module für den Bot hinzufügen können und dann über die Webseite geladen werden. (Alexa Echo mässig)
// Level System || von MEE6 importierbar.
// Type command für Pressence einrichten.
// MongoDB einrichten und lernen


// Giveaway System

