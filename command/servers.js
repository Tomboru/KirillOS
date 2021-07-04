const server = require('../config/config.json');
const german = require('../languages/german.json')

module.exports = {
    callback: async ({ message }) => {
        if (message.author.bot){return;}
        if (message.author.id === (server.DEBUGID)){
        bot.guilds.cache.forEach((guild) => {
            message.channel.send(
            `${guild.id} | ${german.has_a_total_of} ${guild.memberCount} ${german.Members}`
            )
        })
    }else{message.channel.send(`${message.author.username} ${german.not_allowed}`)}
    }
}