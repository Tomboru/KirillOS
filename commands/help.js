const config = require('../config/config.json');
let Discord = require('discord.js');
const command = require('../commands/command')
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')

module.exports = (bot) => {
    command(bot, 'help', (message) => {
        if (message.author.bot){return;}
        if (message.guild){
            let embed = new Discord.MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setThumbnail(bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor('7289da')
            .setDescription(`You need more help for one command?                               \nJust write ${config.prefix}(Command)`)
            .addField(`${config.prefix}${config.giveawaycmd} [duration] [prize]`, 'Duration is statet in a number and a time variable.\nPrize can be anything but it has to be one.')
            message.author.send(embed);}
            if (!message.guild){
                let embed = new Discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),)
                .setThumbnail(bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setColor('7289da')
                .setDescription(`You need more help for one command?                               \nJust write ${config.prefix}(Command)`)
                .addField(`${config.prefix}${config.giveawaycmd} [duration] [prize]`, 'Duration is statet in a number and a time variable.\nPrize can be anything but it has to be one.')
                message.author.send(embed);
        }
    })
}