const command = require('../commands/command')
const config = require('../config/config.json');
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')

module.exports = (bot) => {
    command(bot, 'sr', (message) => { 

        if (message.author.bot)return;
        
    })
}