const command = require('./command')
const server = require('../config/config.json');
let Discord = require('discord.js');
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')

module.exports = (bot) => {
    command(bot, 'Avatar', (message) => {
        message.channel.send(new MessageEmbed()
        .setColor("#F0EAD6")
        .setTitle(`Momentanes Avatar`)
        .setFooter(`https://www.pinterest.de/pin/418201515403394863/`)
        );
    });
}