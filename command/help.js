const config = require('../config/config.json');
let Discord = require('discord.js');

module.exports = {
    testOnly: true,
    callback: async ({ message }) => {
        //if (message.author.client){
          //  console.log("Eh okay")
         //   return;}
        if (message.guild){
            let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor('7289da')
            .setDescription(`You need more help for one command?                               \nJust write ${config.prefix}(Command)`)
            .addField(`${config.prefix}${config.giveawaycmd} [duration] [prize]`, 'Duration is statet in a number and a time variable.\nPrize can be anything but it has to be one.')
            message.author.send(embed);}
            if (!message.guild){
                let embed = new Discord.MessageEmbed()
                //.setAuthor(client.user.username, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),)
                //.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setColor('7289da')
                .setDescription(`You need more help for one command?                               \nJust write ${config.prefix}(Command)`)
                .addField(`${config.prefix}${config.giveawaycmd} [duration] [prize]`, 'Duration is statet in a number and a time variable.\nPrize can be anything but it has to be one.')
                message.author.send(embed);
                console.log(message.author)
        }
    }
}