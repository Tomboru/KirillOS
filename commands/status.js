const command = require('../commands/command')
const config = require('../config/config.json');

module.exports = (bot) => {
    command(bot, 'status', (message) => {
        if(!message.member.roles.cache.has('819270909483286550')) return message.channel.send(`${german.not_allowed}`);
        const status = message.content.replace(`${ server.prefix }status `, '')
    
        bot.user.setPresence({
            activity: {
                name: status,
                //Types -> "PLAYING", "STREAMING", "LISTENING", "WATCHING" -> Später im Command änderbar. Also auch Liste dafür.
                type: 'WATCHING'
            }
        })
        message.channel.send( `${ german.pressence_set_to } ${ extra.text_codeblock }${ status }${ extra.text_codeblock }` )
    })
}