const command = require('../commands/command')
const server = require('../config/config.json');
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')

module.exports = (bot) => {
    command(bot, 'servers', (message) => {
        if (message.author.bot){return;}
        if (message.author.id === (server.DEBUGID)){
        bot.guilds.cache.forEach((guild) => {
            message.channel.send(
            `${guild.id} | ${german.has_a_total_of} ${guild.memberCount} ${german.Members}`
            )
        })
    }else{message.channel.send(`${message.author.username} ${german.not_allowed}`)}
    })
}