const { prefix } = require('../config/prefix.json')
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')

module.exports = (bot, aliases, callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases]
    }
    bot.on('message', message => {
        const { content } = message;

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`

            if (content.startsWith(`${command} `) || content === command) {
                console.log(`Running the command ${command}`)
                callback(message)
            }
        })
    })
}