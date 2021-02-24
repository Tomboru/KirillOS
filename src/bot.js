require('dotenv').config();

const { Client, Guild } = require('discord.js')
const bot = new Client();

const german = require('../languages/german.json')
const extra = require('../languages/extra.json')

const config = require('../config/config.json')
const token = require('../config/token.json')
const command = require('../commands/command')

//Bot login
bot.login(token.DISCORDJS_BOT_TOKEN);

//Check if bot is online
bot.on('ready', () => {

    console.log(`${bot.user.tag}`)
    bot.user.setPresence({
        activity: {
            name: "auf Sara's Möthharem",
            //Types -> "PLAYING", "STREAMING", "LISTENING", "WATCHING" -> Später im Command änderbar. Also auch Liste dafür.
            type: 'WATCHING'
        }
    })
});

command(bot, 'servers', (message) => {

    if (message.author.bot){return;}
    if (message.author.id === (config.DEBUGID)){
    bot.guilds.cache.forEach((guild) => {
        message.channel.send(
        `${guild.name} | ${german.has_a_total_of} ${guild.memberCount} ${german.Members}`
        )
    })
}else{message.channel.send(`${message.author.username} ${german.not_allowed}`)}
})

command(bot, 'status', (message) => {
    const status = message.content.replace(`${ config.prefix }status`, '')

    bot.user.setPresence({
        activity: {
            name: status,
            //Types -> "PLAYING", "STREAMING", "LISTENING", "WATCHING" -> Später im Command änderbar. Also auch Liste dafür.
            type: 'WATCHING'
        }
    })
    message.channel.send( `${ german.pressence_set_to } ${ extra.text_codeblock }${ status }${ extra.text_codeblock }` )
})

//Read & answer on message
bot.on('message', (message) => {

    if (message.author.bot) return;
    console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content === 'test'){
    message.channel.send(config.TESTMESSAGE)
    }
});

//Creates Debug rank and gives it to DiscordID in the .env

//Avatarlink
bot.on('message', (message) => {

    if (message.author.bot) return;
    if (message.content === 'Avatar'){
    message.channel.send(config.AVATARLINK)
    }
});


// Man soll Privat nachrichten erhalten können, wenn mit einem was gemacht wird. (Rang erhalten, entfernen, kicken, bannen, muten, moven, etc.)
// Diese Benachrichtigungen kann man an & Ausschalten.
// Man soll auch Silent an machen können, damit man unbemerkt leute moven, kicken, bannen, etc. kann. -> Man erhält keine Benachrichtigung mehr.
// Bot soll Musik im Channel abspielen können || Dabei soll er auch Nightcore, Vaporwave, etc. haben.
// Nachrichten schöner gestallten
// Git-Lab / Git-Hub einrichten -> Damit man mit verfolgen kann, was neu ist.
// Debug Rang fertig machen
// Ban, Mute, Kick, etc. || Administrative Commands
// Webinterface || Alles soll darber Konfiguriert werden können. -> Als auch soll darin ein Admin Interface & User Interface befinden. Im Interface soll man weitere Module für den Bot hinzufügen können und dann über die Webseite geladen werden. (Alexa Echo mässig)
// Level System || von MEE6 importierbar.
// Help command einrichten.
// Type command für Pressence einrichten.