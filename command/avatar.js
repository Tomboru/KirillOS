let Discord = require('discord.js')

module.exports = {
    callback: async ({ message }) => {
        message.channel.send(new Discord.MessageEmbed()
        .setColor("#F0EAD6")
        .setTitle(`Momentanes Avatar`)
        .setFooter(`https://www.pinterest.de/pin/418201515403394863/`)
        );
    }
}

/* let embed = new Discord.MessageEmbed()
.setAuthor('User warned', bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setThumbnail(target.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setColor('56C596')
.setDescription(`${target} was successfully warned.                               \n${target} has now ${countwarns}`)
.addField(`${target} got warned because of ${reason}`)
message.author.send(embed);
*/